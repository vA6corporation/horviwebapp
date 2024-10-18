import { Component } from '@angular/core';
import { SeacesService } from '../seaces.service';
import { SeaceModel } from '../seace.model';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { CommonModule, formatDate } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { buildExcel } from '../../build-excel';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailSeacesComponent } from '../dialog-detail-seaces/dialog-detail-seaces.component';

@Component({
    selector: 'app-seaces',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './seaces.component.html',
    styleUrl: './seaces.component.sass'
})
export class SeacesComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly seacesService: SeacesService,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['adjudicatedAt', 'nomenclature', 'beneficiarie', 'objectContract', 'state', 'department', 'referenceValue', 'actions']
    dataSource: SeaceModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    formGroup: FormGroup = this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        state: '',
    })

    private params: Params = {}

    private handleClickMenu$: Subscription = new Subscription()
    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleClickMenu$.unsubscribe()
    }

    ngOnInit() {
        this.navigationService.setTitle('Seace')

        this.navigationService.setMenu([
            { id: 'search', label: 'Buscar', icon: 'search', show: true },
            { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
        ])

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.seacesService.getSeacesByKey(key, this.params).subscribe({
                next: seaces => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = seaces
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })

        const { startDate, endDate, state, pageIndex, pageSize } = this.activatedRoute.snapshot.queryParams

        if (startDate && endDate) {
            this.formGroup.patchValue({ startDate: new Date(startDate), endDate: new Date(endDate) })
            Object.assign(this.params, { startDate, endDate })
        }

        if (state) {
            this.formGroup.patchValue({ state })
            Object.assign(this.params, { state })
        }

        this.pageIndex = Number(pageIndex || 0)
        this.pageSize = Number(pageSize || 10)

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            this.navigationService.loadBarStart()
            const chunk = 500
            const promises: Promise<any>[] = []

            for (let index = 0; index < this.length / chunk; index++) {
                const promise = lastValueFrom(this.seacesService.getSeacesByPage(index + 1, chunk, this.params))
                promises.push(promise)
            }

            Promise.all(promises).then(values => {
                this.navigationService.loadBarFinish()
                const seaces: SeaceModel[] = values.flat()
                const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                let body = []
                body.push([
                    'FECHA ADJUDICACION',
                    'FECHA PUBLICACION',
                    'MOMENCLATURA',
                    'OBJETO DE CONTRATACION',
                    'ESTADO',
                    'VALOR REFERENCIAL',
                ])
                for (const seace of seaces) {
                    body.push([
                        seace.adjudicatedAt ? formatDate(seace.adjudicatedAt, 'dd/MM/yyyy', 'en-US') : null,
                        formatDate(seace.publishedAt, 'dd/MM/yyyy', 'en-US'),
                        seace.nomenclature,
                        seace.objectContract,
                        seace.state,
                        seace.referenceValue,
                    ])
                }
                const name = `SEACE_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`
                buildExcel(body, name, wscols, [], [])
            })
        })

        this.fetchData()
        this.fetchCount()
    }

    fetchCount() {
        this.seacesService.getCountSeaces(this.params).subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.seacesService.getSeacesByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(seaces => {
            this.navigationService.loadBarFinish()
            this.dataSource = seaces
        })
    }

    onClickCopy() {
        this.navigationService.showMessage('Copiado al portapapeles')
    }

    onDialogDetailSeaces(seaceId: string) {
        this.matDialog.open(DialogDetailSeacesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: seaceId,
        })
    }

    onStateChange() {
        this.pageIndex = 0
        const { state } = this.formGroup.value
        const queryParams: Params = { state, pageIndex: 0 }
        Object.assign(this.params, { state })
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })
        this.fetchCount()
        this.fetchData()
    }

    onRangeChange() {
        if (this.formGroup.valid) {
            this.pageIndex = 0
            const { startDate, endDate } = this.formGroup.value
            const queryParams: Params = { startDate: startDate, endDate: endDate, pageIndex: 0 }
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            })
            Object.assign(this.params, queryParams)
            this.fetchCount()
            this.fetchData()
        }
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

}
