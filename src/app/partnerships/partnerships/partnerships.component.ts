import { CommonModule, formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Params, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PartnershipModel } from '../partnership.model';
import { PartnershipsService } from '../partnerships.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { buildExcel } from '../../build-excel';

@Component({
    selector: 'app-partnerships',
    standalone: true,
    imports: [MaterialModule, RouterLink, CommonModule],
    templateUrl: './partnerships.component.html',
    styleUrls: ['./partnerships.component.sass']
})
export class PartnershipsComponent implements OnInit {

    constructor(
        private readonly partnershipsService: PartnershipsService,
        private readonly navigationService: NavigationService,
    ) { }

    displayedColumns: string[] = ['document', 'name', 'business', 'actions']
    dataSource: PartnershipModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0
    private params: Params = {}

    private handleSearch$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Consorcios')

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
        ])

        this.fetchData()
        this.fetchCount()

        this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
            this.navigationService.loadBarStart()
            this.partnershipsService.getPartnershipsByKey(key).subscribe(partnerships => {
                this.navigationService.loadBarFinish()
                this.dataSource = partnerships
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            })
        })

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            if (id === 'export_excel') {
                this.navigationService.loadBarStart()
                this.partnershipsService.getPartnerships().subscribe(partnerships => {
                    this.navigationService.loadBarFinish()
                    const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                    let body = []
                    body.push([
                        'RUC',
                        'RAZON SOCIAL',
                        'OPERADOR TRIBUTARIO',
                        'REPRESENTANTE LEGAL',
                    ])

                    for (const partnership of partnerships) {
                        body.push([
                            partnership.document,
                            partnership.name,
                            partnership.business?.name,
                            partnership.representative,
                        ])
                    }

                    const name = `CONSORCIOS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`
                    buildExcel(body, name, wscols, [], [])
                })
            }
        })
    }

    fetchCount() {
        this.partnershipsService.getCountPartnerships(this.params).subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.partnershipsService.getPartnershipsByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(partnerships => {
            this.navigationService.loadBarFinish()
            this.dataSource = partnerships
        })
    }

    onDelete(partnershipId: string) {
        const ok = confirm('Estas seguro de eliminar?...')
        if (ok) {
            this.navigationService.loadBarStart()
            this.partnershipsService.delete(partnershipId).subscribe(() => {
                this.navigationService.loadBarFinish()
                this.dataSource = this.dataSource.filter(e => e._id !== partnershipId)
                this.navigationService.showMessage('Eliminado correctamente')
            })
        }
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

}
