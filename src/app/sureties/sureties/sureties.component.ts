import { CommonModule, formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildExcel } from '../../build-excel';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { SuretiesService } from '../sureties.service';
import { SuretyModel } from '../surety.model';
import { SuretyStatus } from './surety-status.enum';

@Component({
    selector: 'app-sureties',
    standalone: true,
    imports: [MaterialModule, RouterModule, ReactiveFormsModule, CommonModule],
    templateUrl: './sureties.component.html',
    styleUrl: './sureties.component.sass'
})
export class SuretiesComponent {

    constructor(
        private readonly suretiesService: SuretiesService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['suretyTypeLabel', 'partnership', 'business', 'policyNumber', 'startDate', 'endDate', 'price', 'observations', 'actions']
    dataSource: SuretyModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0
    formGroup: FormGroup = this.formBuilder.group({
        suretyType: '',
    })
    suretyStatus = SuretyStatus
    params: Params = {}

    private handleSearch$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Fianzas')
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            // { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
        ])

        this.fetchData()
        this.fetchCount()

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.suretiesService.getSuretiesByKey(key).subscribe({
                next: sureties => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = sureties
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            if (id == 'export_excel') {
                this.navigationService.loadBarStart()
                this.navigationService.loadBarFinish()
                const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                let body = []
                body.push([
                    'CONSORCIO',
                    'CLIENTE',
                    'N° POLIZA',
                    'OBJETO',
                    'F. DE INICIO',
                    'F. DE CUMPLIMIENTO',
                    'SUMA ASEGURADA',
                    'PRIMA',
                    'GARANTIA',
                    'COMISION',
                    'ESTADO DE TRAMITE',
                    'ESTADO DE OBRA',
                    'P. A CARGO'
                ])

                const name = `ADELANTO_DE_MATERIALES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`
                buildExcel(body, name, wscols, [], [])
            }
        })
    }

    async onSelectStatus(surety: SuretyModel, suretyStatus: SuretyStatus) {
        surety.status = suretyStatus
        this.suretiesService.update(surety, surety._id).subscribe(() => {
            this.fetchData()
            this.navigationService.showMessage('Se han guardado los cambios')
        })
    }

    onSuretyChange() {
        const { suretyType } = this.formGroup.value
        Object.assign(this.params, { suretyType })
        this.pageIndex = 0

        const queryParams: Params = { pageIndex: 0, suretyType }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })

        this.fetchData()
        this.fetchCount()
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        const queryParams = { pageIndex: this.pageIndex, pageSize: this.pageSize }
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })
        this.fetchData()
    }

    onDelete(suretyId: string) {
        const ok = confirm('Esta seguro de eliminar?...')
        if (ok) {
            this.suretiesService.delete(suretyId).subscribe(() => {
                this.navigationService.showMessage('Eliminado correctamente')
                this.fetchData()
            })
        }
    }

    fetchCount() {
        this.suretiesService.getCountSureties(this.params).subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.suretiesService.getSuretiesByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(sureties => {
            this.navigationService.loadBarFinish()
            this.dataSource = sureties
        })
    }

}
