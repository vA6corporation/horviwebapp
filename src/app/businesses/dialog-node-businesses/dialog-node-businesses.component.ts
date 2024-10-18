import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { BusinessNodeModel } from '../business-node.model';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, firstValueFrom, merge } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { catchError, last, map, tap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessesService } from '../businesses.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface UploadFileModel {
    name: string
    progressPercent: number
    message: string | null
}

export enum BusinessNodeType {
    DOCUMENT = 'DOCUMENT',
    EXPERIENCE = 'EXPERIENCE',
    FINANCIAL = 'FINANCIAL'
}

export interface DialogBusinessNodeData {
    businessId: string
    type: BusinessNodeType
}

export class FlatNode {
    constructor(
        public _id: string,
        public name: string,
        public level = 1,
        public expandable = false,
        public contentType = '',
        public fileId: string|null = null,
        public isLoading = false,
        public percentDone = 0
    ) { }
}

export class DynamicDatabase {

    constructor(
        private readonly operations: BusinessNodeModel[]
    ) {
        const dataMap = new Map<string, BusinessNodeModel[]>();
        for (const operation of operations) {
            let groupOperationNodes: BusinessNodeModel[] = []
            for (const subOperation of operations) {
                if (operation._id === subOperation.businessNodeId) {
                    groupOperationNodes.push(subOperation);
                }
            }
            dataMap.set(operation._id, groupOperationNodes);
        }
        this.dataMap = dataMap;
    }

    dataMap = new Map<string, BusinessNodeModel[]>();

    rootLevelNodes: BusinessNodeModel[] = [];

    initialData(): FlatNode[] {
        return this.operations.filter(e => e.businessNodeId === null).map(e => new FlatNode(e._id, e.name, 0, true));
    }

    setBusinessNodes(operations: BusinessNodeModel[]): void {
        const dataMap = new Map<string, BusinessNodeModel[]>();
        for (const operation of operations) {
            let groupOperationNodes: BusinessNodeModel[] = []
            for (const subOperation of operations) {
                if (operation._id === subOperation.businessNodeId) {
                    groupOperationNodes.push(subOperation);
                }
            }
            dataMap.set(operation._id, groupOperationNodes);
        }
        this.dataMap = dataMap;
    }

    getChildren(operationId: string): BusinessNodeModel[] | undefined {
        return this.dataMap.get(operationId);
    }

    isExpandable(operationId: string): boolean {
        return this.dataMap.has(operationId);
    }
}

export class DynamicDataSource implements DataSource<FlatNode> {

    constructor(
        private _treeControl: FlatTreeControl<FlatNode>,
        private _database: DynamicDatabase,
    ) { }

    dataChange = new BehaviorSubject<FlatNode[]>([]);

    get data(): FlatNode[] {
        return this.dataChange.value;
    }
    set data(value: FlatNode[]) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    connect(collectionViewer: CollectionViewer): Observable<FlatNode[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if (
                (change as SelectionChange<FlatNode>).added ||
                (change as SelectionChange<FlatNode>).removed
            ) {
                this.handleTreeControl(change as SelectionChange<FlatNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    disconnect(collectionViewer: CollectionViewer): void { }

    handleTreeControl(change: SelectionChange<FlatNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed
                .slice()
                .reverse()
                .forEach(node => this.toggleNode(node, false));
        }
    }

    removeNode(node: FlatNode) {
        const nodeIndex = this.data.indexOf(node);
        this.data.splice(nodeIndex, 1);
        this.dataChange.next(this.data);
    }

    addNode(node: FlatNode, parentNode: FlatNode | null = null) {
        if (parentNode) {
            const indexNode = this.data.indexOf(parentNode)
            const children = this._database.getChildren(parentNode._id) || []
            this.data.splice(indexNode + children.length + 1, 0, node)
            this.dataChange.next(this.data)
        } else {
            this.data.push(node)
            this.dataChange.next(this.data)
        }
    }

    updateNode(node: FlatNode) {
        const nodeIndex = this.data.indexOf(node);
        this.data.splice(nodeIndex, 1, node);
        this.dataChange.next(this.data);
    }

    toggleNode(node: FlatNode, expand: boolean) {
        console.log('Togleando node');
        const children = this._database.getChildren(node._id);
        const index = this.data.indexOf(node);

        if (!children || index < 0) {
            return;
        }

        node.isLoading = true;

        if (expand) {
            const nodes = children.map(
                businessNode => new FlatNode(
                    businessNode._id,
                    businessNode.name, node.level + 1,
                    !businessNode.fileId,
                    businessNode.contentType || '',
                    businessNode.fileId || null,
                )
            );
            this.data.splice(index + 1, 0, ...nodes);
        } else {
            let count = 0;
            for (
                let i = index + 1;
                i < this.data.length && this.data[i].level > node.level;
                i++, count++
            ) { }
            this.data.splice(index + 1, count);
        }

        this.dataChange.next(this.data);
        node.isLoading = false;
    }
}

@Component({
  selector: 'app-dialog-node-businesses',
  templateUrl: './dialog-node-businesses.component.html',
  styleUrls: ['./dialog-node-businesses.component.sass']
})
export class DialogNodeBusinessesComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: DialogBusinessNodeData,
        private readonly businessesService: BusinessesService,
        private readonly sanitizer: DomSanitizer,
        private readonly ngZone: NgZone,
    ) {
        this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    }

    treeControl: FlatTreeControl<FlatNode>
    dataSource!: DynamicDataSource
    dataBase!: DynamicDatabase

    url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')
    accept: string = ''
    isLoading: boolean = false
    tabIndex: number = 0
    fileId: string = ''
    isDragOver = false
    uploadingFiles: UploadFileModel[] = []
    isUploading: boolean = false

    getLevel = (node: FlatNode) => node.level;

    isExpandable = (node: FlatNode) => node.expandable;

    hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

    ngOnInit(): void {
        this.businessesService.getBusinessNodesByTypeBusiness(this.data.type, this.data.businessId).subscribe(businessNodes => {
            console.log(businessNodes);
            this.dataBase = new DynamicDatabase(businessNodes);
            this.dataSource = new DynamicDataSource(this.treeControl, this.dataBase);
            this.dataSource.data = this.dataBase.initialData();
        }, (error: HttpErrorResponse) => {
            console.log(error);
        });
    }

    fetchData() {
        this.businessesService.getBusinessNodesByTypeBusiness(this.data.type, this.data.businessId).subscribe(businessNodes => {
            console.log(businessNodes)
            this.dataBase.setBusinessNodes(businessNodes)
        })
    }

    downloadURI(uri: string, name: string) {
        const link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    onDeleteNode(businessNode: FlatNode) {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            this.businessesService.deleteNode(businessNode._id).subscribe(() => {
                const isExpanded = this.treeControl.isExpanded(businessNode);
                if (isExpanded) {
                    this.treeControl.collapse(businessNode);
                }
                this.dataSource.removeNode(businessNode);
                this.fetchData();
            });
        }
    }

    onUpdateNode(businessNode: BusinessNodeModel) {
        const name = prompt('Cambiar nombre de carpeta');
        if (name) {
            businessNode.name = name;
            this.businessesService.updateNode(businessNode, businessNode._id).subscribe(() => {
                this.fetchData();
            });
        }
    }

    onCreateNode(parentNode: FlatNode | null) {
        const businessNodeId = parentNode ? parentNode._id : null;
        const name = prompt('Nueva carpeta');
        if (name) {
            const businessNode = { 
                name, 
                type: this.data.type, 
                businessId: this.data.businessId, 
                businessNodeId 
            }
            this.businessesService.createNode(businessNode).subscribe({
                next: async createdBusinessNode => {
                    const level = parentNode ? parentNode.level + 1 : 0;
                    const createdFlatNode = new FlatNode(
                        createdBusinessNode._id,
                        createdBusinessNode.name,
                        level,
                        true,
                    )
                    this.fetchData()
                    let isExpanded = false
                    if (parentNode) {
                        isExpanded = this.treeControl.isExpanded(parentNode);
                        if (!isExpanded) {
                            this.treeControl.expand(parentNode);
                        }
                    }
                    this.dataSource.addNode(createdFlatNode, parentNode);
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error.error.message);
                }
            });
        }
    }

    onSelectFile(businessNode: FlatNode) {
        this.fileId = businessNode.fileId || '';
        if (
            businessNode.contentType &&
            (businessNode.contentType === 'application/pdf' || businessNode.contentType.includes('image'))
        ) {
            this.tabIndex = 1;
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}businessNodes/byFileId/${this.fileId}`);
        } else {
            this.downloadURI(`${environment.baseUrl}businessNodes/byFileIdDownload/${this.fileId}/${businessNode.name}`, businessNode.name);
        }
    }

    private getEventMessage(event: HttpEvent<any>): any {
        switch (event.type) {
            case HttpEventType.Sent:
                return 0

            case HttpEventType.UploadProgress:
                return event.total ? Math.round(100 * event.loaded / event.total) : 0

            case HttpEventType.Response:
                return event.body

            default:
                return 0
        }
    }

    async onFileSelected(
        files: FileList | null,
        parentNode: FlatNode,
        input: HTMLInputElement
    ) {
        if (files !== null) {
            const promises: Promise<any>[] = []
            const createdBusinessNodes: any[] = []
            for (let index = 0; index < files.length; index++) {
                const file = files[index]
                const formData = new FormData()
                formData.append('file', file)
                formData.append('businessNode[name]', file.name)
                formData.append('businessNode[type]', this.data.type)
                formData.append('businessNode[businessId]', this.data.businessId)
                formData.append('businessNode[businessNodeId]', parentNode._id)
                const uploadFile: UploadFileModel = {
                    name: file.name,
                    progressPercent: 0,
                    message: null
                }
                this.isUploading = true
                this.uploadingFiles.push(uploadFile)
                this.tabIndex = 2
                const promise = this.businessesService.uploadFile(formData).pipe(
                    map(event => this.getEventMessage(event)),
                    tap(progressPercent => {
                        uploadFile.progressPercent = progressPercent
                    }),
                    last(), // return last (completed) message to caller
                    catchError(err => {
                        throw err
                    })
                ).toPromise().then(createdBusinessNode => {
                    createdBusinessNodes.push(createdBusinessNode)
                    const subIndex = this.uploadingFiles.indexOf(uploadFile)
                    this.uploadingFiles.splice(subIndex, 1)
                }).catch((error: HttpErrorResponse) => {
                    console.log(error);
                    uploadFile.message = error.message
                })
                promises.push(promise)
            }
            try {
                await Promise.all(promises)
            } catch (error) {
                console.log(error);
            }
            for (const createdBusinessNode of createdBusinessNodes) {
                const level = parentNode ? parentNode.level + 1 : 0;
                const createdFlatNode = new FlatNode(
                    createdBusinessNode._id,
                    createdBusinessNode.name,
                    level,
                    false,
                )
                const isExpanded = this.treeControl.isExpanded(parentNode);
                if (!isExpanded) {
                    this.treeControl.expand(parentNode)
                }
                this.dataSource.addNode(createdFlatNode, parentNode)
            }
            this.tabIndex = 0
            this.isLoading = false
            this.fetchData()
        }
        input.value = '';
    }

    traverseFileTree(
        item: any,
        businessNodeId: string | null = null
    ): Promise<void> {
        return new Promise(async (resolve, _) => {
            if (item.isFile) {
                // Get file
                item.file((file: any) => {
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('businessNode[name]', file.name)
                    formData.append('businessNode[type]', this.data.type)
                    formData.append('businessNode[businessId]', this.data.businessId)
                    if (businessNodeId) {
                        formData.append('businessNode[businessNodeId]', businessNodeId)
                    }
                    const uploadFile: UploadFileModel = {
                        name: file.name,
                        progressPercent: 0,
                        message: null
                    }
                    this.ngZone.run(() => {
                        this.uploadingFiles.push(uploadFile)
                    })
                    this.tabIndex = 2
                    this.businessesService.uploadFile(formData).pipe(
                        map(event => this.getEventMessage(event)),
                        tap(progressPercent => {
                            this.ngZone.run(() => {
                                uploadFile.progressPercent = progressPercent
                            })
                        }),
                        last(), // return last (completed) message to caller
                        catchError(err => {
                            throw err
                        })
                    ).toPromise().then(() => {
                        resolve()
                    }).catch((error: HttpErrorResponse) => {
                        console.log(error);
                        uploadFile.message = error.message
                    })
                });
            } else {
                // Get folder contents
                var dirReader = item.createReader();
                const businessNode = { name: item.name, type: this.data.type, businessId: this.data.businessId, businessNodeId }
                const createdOperationNode = await firstValueFrom(this.businessesService.createNode(businessNode))
                dirReader.readEntries(async (entries: any) => {
                    for (let i = 0; i < entries.length; i++) {
                        await this.traverseFileTree(entries[i], createdOperationNode._id)
                    }
                    resolve()
                });
            }
        })
    }

    async onDrop(event: DragEvent) {
        event.preventDefault()
        event.stopPropagation()
        this.isUploading = true
        this.tabIndex = 2
        const promises: any[] = []
        if (event && event.dataTransfer) {
            var items = event.dataTransfer.items
            for (let i = 0; i < items.length; i++) {
                var item = items[i].webkitGetAsEntry()
                if (item) {
                    promises.push(this.traverseFileTree(item))
                }
            }
        }
        try {
            await Promise.all(promises)
        } catch (error) {
            console.log(error);
        }
        this.isDragOver = false
        this.isUploading = false
        this.uploadingFiles = []
        this.tabIndex = 0
        this.businessesService.getBusinessNodesByTypeBusiness(this.data.type, this.data.businessId).subscribe(businessNodes => {
            this.dataBase = new DynamicDatabase(businessNodes)
            this.dataSource = new DynamicDataSource(this.treeControl, this.dataBase)
            this.dataSource.data = this.dataBase.initialData()
        })
    }

    onDragOver(event: Event) {
        this.isDragOver = true
        event.stopPropagation()
        event.preventDefault()
    }

    onDragLeave(event: Event) {
        this.isDragOver = false
        event.stopPropagation()
        event.preventDefault()
    }

}
