import { Component } from '@angular/core';
import { NavigationService } from '../../navigation/navigation.service';
import { TendersService } from '../tenders.service';
import { TenderModel } from '../tender.model';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateSuretiesComponent } from '../../sureties/dialog-create-sureties/dialog-create-sureties.component';
import { DialogSuretiesComponent } from '../../sureties/dialog-sureties/dialog-sureties.component';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommercialsService } from '../../commercials/commercials.service';
import { CommercialModel } from '../../commercials/commercial.model';

@Component({
    selector: 'app-tenders',
    standalone: true,
    imports: [MaterialModule, RouterModule, ReactiveFormsModule, CommonModule],
    templateUrl: './tenders.component.html',
    styleUrl: './tenders.component.sass'
})
export class TendersComponent {

    constructor(
        private readonly commercialsService: CommercialsService,
        private readonly navigationService: NavigationService,
        private readonly tendersService: TendersService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['emitionAt', 'code', 'object', 'commercial', 'business', 'partnership', 'observations', 'actions']
    dataSource: TenderModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 20]
    pageIndex: number = 0
    formGroup: FormGroup = this.formBuilder.group({
        commercialId: ''
    })
    commercials: CommercialModel[] = []
    private params: Params = {}

    private handleSearch$: Subscription = new Subscription()
    private handleCommercials$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
        this.handleCommercials$.unsubscribe()
    }

    ngOnInit() {
        this.navigationService.setTitle('Obras')

        this.navigationService.setMenu([
            { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
            { id: 'search', icon: 'search', show: true, label: '' },
        ])

        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.tendersService.getTendersByPageKey(this.pageIndex + 1, this.pageSize, key).subscribe({
                next: tenders => {
                    console.log(tenders)
                    this.navigationService.loadBarFinish()
                    this.dataSource = tenders
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })

        this.fetchData()
        this.fetchCount()
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

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.tendersService.getTendersByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(tenders => {
            this.navigationService.loadBarFinish()
            this.dataSource = tenders
        })
    }

    fetchCount() {
        this.tendersService.getCountTenders().subscribe(count => {
            this.length = count
        })
    }

    onDialogSureties(tenderId: string) {
        const dialogRef = this.matDialog.open(DialogSuretiesComponent, {
            data: tenderId,
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.componentInstance.handleCreateSurety().subscribe(() => {
            this.matDialog.open(DialogCreateSuretiesComponent, {
                data: tenderId,
                width: '600px',
                position: { top: '20px' }
            })
        })
    }

    onDialogCreateSureties(tenderId: string) {
        this.matDialog.open(DialogCreateSuretiesComponent, {
            data: tenderId,
            width: '600px',
            position: { top: '20px' }
        })
    }

}
