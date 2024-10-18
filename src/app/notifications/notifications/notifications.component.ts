import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { CommercialModel } from '../../commercials/commercial.model';
import { CommercialsService } from '../../commercials/commercials.service';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { DialogDetailSeacesComponent } from '../../seaces/dialog-detail-seaces/dialog-detail-seaces.component';
import { NotificationModel } from '../notification.model';
import { NotificationsService } from '../notifications.service';
import { buildExcel } from '../../build-excel';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.sass'
})
export class NotificationsComponent {

    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly commercialsService: CommercialsService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['adjudicatedAt', 'nomenclature', 'referenceValue', 'objectContract', 'state', 'department', 'beneficiarie', 'commercial', 'actions']
    dataSource: NotificationModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0
    formGroup: FormGroup = this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        objectContract: '',
        commercialId: ''
    })
    commercials: CommercialModel[] = []
    private params: Params = {}

    private handleAuth$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()
    private handleCommercials$: Subscription = new Subscription()

    ngOnDestroy(): void {
        this.handleAuth$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
        this.handleCommercials$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Notificaciones')

        this.navigationService.setMenu([
            { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
            // { id: 'search', icon: 'search', show: true, label: '' },
        ])

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            this.navigationService.loadBarStart()
            const chunk = 500
            const promises: Promise<any>[] = []

            for (let index = 0; index < this.length / chunk; index++) {
                const promise = lastValueFrom(this.notificationsService.getNotificationsByPage(index + 1, chunk, this.params))
                promises.push(promise)
            }

            Promise.all(promises).then(values => {
                this.navigationService.loadBarFinish()
                const notifications: NotificationModel[] = values.flat()
                const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                let body = []
                body.push([
                    'FECHA ADJUDICACION',
                    'MOMENCLATURA',
                    'OBJETO DE CONTRATACION',
                    'ESTADO',
                    'VALOR REFERENCIAL',
                    'COMERCIAL A CARGO',
                ])
                for (const notification of notifications) {
                    body.push([
                        notification.adjudicatedAt ? formatDate(notification.adjudicatedAt, 'dd/MM/yyyy', 'en-US') : null,
                        notification.seace.nomenclature,
                        notification.seace.objectContract,
                        notification.seace.state,
                        notification.seace.referenceValue,
                        notification.commercial.name
                    ])
                }
                const name = `SEACE_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`
                buildExcel(body, name, wscols, [], [])
            })
        })

        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        this.fetchData()
        this.fetchCount()
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

    onCommercialChange() {
        const { commercialId } = this.formGroup.value
        Object.assign(this.params, { commercialId })
        this.pageIndex = 0
        const queryParams: Params = { pageIndex: 0, commercialId }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })

        this.fetchData()
        this.fetchCount()
    }

    onObjectContractChange() {
        const { objectContract } = this.formGroup.value
        Object.assign(this.params, { objectContract })

        this.pageIndex = 0

        const queryParams: Params = { pageIndex: 0, objectContract }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })

        this.fetchData()
        this.fetchCount()
    }

    fetchCount() {
        this.notificationsService.getCountNotifications(this.params).subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.notificationsService.getNotificationsByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(notifications => {
            this.navigationService.loadBarFinish()
            this.dataSource = notifications
        })
    }

    onDialogDetails(seaceId: string) {
        this.matDialog.open(DialogDetailSeacesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: seaceId,
        })
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
