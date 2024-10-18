import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';
import { TendersService } from '../tenders.service';
import { TenderNodeModel } from '../tender-node.model';

export interface DialogAttachFileData {
    fileType: string
    tenderId: string
}

@Component({
  selector: 'app-dialog-attach-file',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-attach-file.component.html',
  styleUrl: './dialog-attach-file.component.sass'
})
export class DialogAttachFileComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: DialogAttachFileData,
        private readonly sanitizer: DomSanitizer,
        private readonly tendersService: TendersService,
    ) { }

    url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')
    accept: string = 'application/pdf, image/png, image/gif, image/jpeg, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/msword, .doc, .docx'
    isLoading: boolean = false
    tenderNodes: TenderNodeModel[] = []
    tenderNodeId: string = ''
    tabIndex: number = 0

    ngOnInit(): void {
        this.fetchData()
    }

    fetchData() {
        this.tendersService.getTenderNodes(this.data.fileType, this.data.tenderId).subscribe(tenderNodes => {
            this.tenderNodes = tenderNodes
        })
    }

    async onSelectNode(tenderNode: TenderNodeModel) {
        this.tenderNodeId = tenderNode._id
        switch (tenderNode.mimeType) {
            case 'application/pdf': {
                this.tabIndex = 1
                const file = await this.tendersService.getFile(`tenderNodes/files/${tenderNode._id}`)
                const urlFile = window.URL.createObjectURL(file)
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(urlFile)
                break
            }
            case 'image/jpeg':
            case 'image/png': {
                this.tabIndex = 1
                const file = await this.tendersService.getFile(`tenderNodes/files/${tenderNode._id}`)
                const urlFile = window.URL.createObjectURL(file)
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(urlFile)
                break
            }
            default: {
                const file = await this.tendersService.getFile(`tenderNodes/files/${tenderNode._id}`)
                const urlFile = window.URL.createObjectURL(file)
                this.downloadFile(urlFile, tenderNode.name)
                break
            }
        }
    }

    onDeleteFile() {
        this.tabIndex = 0
        this.tendersService.deleteFile(this.tenderNodeId).subscribe(() => {
            this.tenderNodeId = ''
            this.fetchData()
        })
    }

    downloadFile(url: string, name: string) {
        var link = document.createElement("a")
        link.download = name
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    onFileSelected(files: FileList | null, input: HTMLInputElement) {
        if (files !== null) {
            console.log(files[0])
            for (let index = 0; index < files.length; index++) {
                const file = files[index]
                const formData = new FormData()
                formData.append('file', file)
                this.tendersService.uploadFile(formData, this.data.fileType, this.data.tenderId).subscribe(tenderNode => {
                    this.fetchData()
                })
                // if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel" || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                //     formData.append('file', file),
                // } else {
                //     new Promise((resolve, reject) => {
                //         const reader = new FileReader();
                //         reader.readAsDataURL(file);
                //         reader.onload = function () {
                //             resolve(reader.result);
                //         };
                //         reader.onerror = function (error) {
                //             reject(error);
                //         };
                //     }).then((result: any) => {
                //         const pdf = new jsPDF("p", "mm", "a4");
                //         const width = pdf.internal.pageSize.getWidth();
                //         const height = pdf.internal.pageSize.getHeight();
                //         pdf.addImage(result, 'JPEG', 0, 0, width, height);
                //         const data = pdf.output('blob');
                //         formData.append('file', data);
                //         this.tendersService.uploadFile(formData, this.data.tenderId, this.data.type).subscribe(pdfId => {
                //             console.log(pdfId);
                //             this.fetchData();
                //         });
                //     });
                // }
            }
        }
        input.value = '';
    }

}
