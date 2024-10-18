import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { InsurancesService } from '../insurances.service';
import { InsuranceNodeModel } from '../insurance-node.model';
import { MaterialModule } from '../../material.module';

export interface DialogAttachFileData {
    fileType: string
    insuranceId: string
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
        private readonly insurancesService: InsurancesService,
    ) { }

    url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')
    accept: string = 'application/pdf, image/png, image/gif, image/jpeg, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/msword, .doc, .docx'
    isLoading: boolean = false
    insuranceNodes: InsuranceNodeModel[] = []
    insuranceNodeId: string = ''
    tabIndex: number = 0

    ngOnInit(): void {
        this.fetchData()
    }

    fetchData() {
        this.insurancesService.getInsuranceNodes(this.data.fileType, this.data.insuranceId).subscribe(insuranceNodes => {
            this.insuranceNodes = insuranceNodes
        })
    }

    async onSelectNode(insuranceNode: InsuranceNodeModel) {
        this.insuranceNodeId = insuranceNode._id
        switch (insuranceNode.mimeType) {
            case 'application/pdf': {
                this.tabIndex = 1
                const file = await this.insurancesService.getFile(`insuranceNodes/files/${insuranceNode._id}`)
                const urlFile = window.URL.createObjectURL(file)
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(urlFile)
                break
            }
            case 'image/jpeg':
            case 'image/png': {
                this.tabIndex = 1
                const file = await this.insurancesService.getFile(`insuranceNodes/files/${insuranceNode._id}`)
                const urlFile = window.URL.createObjectURL(file)
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(urlFile)
                break
            }
            default: {
                const file = await this.insurancesService.getFile(`insuranceNodes/files/${insuranceNode._id}`)
                const urlFile = window.URL.createObjectURL(file)
                this.downloadFile(urlFile, insuranceNode.name)
                break
            }
        }
    }

    onDeleteFile() {
        this.tabIndex = 0
        this.insurancesService.deleteFile(this.insuranceNodeId).subscribe(() => {
            this.insuranceNodeId = ''
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
                this.insurancesService.uploadFile(formData, this.data.fileType, this.data.insuranceId).subscribe(insuranceNode => {
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
                //         this.insurancesService.uploadFile(formData, this.data.insuranceId, this.data.type).subscribe(pdfId => {
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
