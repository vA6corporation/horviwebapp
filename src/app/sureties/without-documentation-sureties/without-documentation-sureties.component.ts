import { Component } from '@angular/core';
import { SuretiesService } from '../sureties.service';
import { NavigationService } from '../../navigation/navigation.service';
import { SuretyModel } from '../surety.model';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogSearchFinanciersComponent } from '../../financiers/dialog-search-financiers/dialog-search-financiers.component';

@Component({
  selector: 'app-without-documentation-sureties',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule],
  templateUrl: './without-documentation-sureties.component.html',
  styleUrl: './without-documentation-sureties.component.sass'
})
export class WithoutDocumentationSuretiesComponent {

    constructor(
        private readonly suretiesService: SuretiesService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['policyNumber', 'invoice', 'voucher', 'cheque', 'deposit', 'surety', 'actions']
    dataSource: SuretyModel[] = []
    length: number = 0
    pageSize: number = 0
    pageSizeOptions: number[] = []
    pageIndex: number = 0
    formGroup: FormGroup = this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        financier: this.formBuilder.group({
            _id: '',
            name: ''
        })
    })
    private params: Params = {}

    ngOnInit(): void {
        this.navigationService.setTitle('Documentacion faltante fianzas')

        const { startDate, endDate, financier } = this.activatedRoute.snapshot.queryParams

        if (startDate && endDate) {
            Object.assign(this.params, { startDate, endDate })
            this.formGroup.patchValue({ startDate: new Date(startDate), endDate: new Date(endDate) })
        }

        if (financier) {
            const parseFinancier = JSON.parse(financier)
            Object.assign(this.params, { financierId: parseFinancier._id })
            this.formGroup.patchValue({ financier: parseFinancier })
        }
        
        this.navigationService.setMenu([
            { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
            { id: 'search', icon: 'search', show: true, label: '' },
        ])

        this.fetchData()
    }

    hasFile(surety: SuretyModel, fileType: string): boolean {
        return !surety.nodes.map(e => e.fileType).includes(fileType)
    }

    countFiles(fileType: string): number {
        let count = 0
        for (const tender of this.dataSource) {
            if (!tender.nodes.map(e => e.fileType).includes(fileType)) {
                count++
            }
        }
        return count
    }

    onRangeChange() {
        if (this.formGroup.valid) {
            const { startDate, endDate } = this.formGroup.value
            const queryParams: Params = { startDate: startDate, endDate: endDate }

            Object.assign(this.params, queryParams)

            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            })

            this.fetchData()
        }
    }

    onDialogSearchFinanciers() {
        const dialogRef = this.matDialog.open(DialogSearchFinanciersComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(financier => {
            if (financier) {
                const queryParams: Params = { financier: JSON.stringify(financier) }
    
                Object.assign(this.params, { financierId: financier._id })
    
                this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams: queryParams,
                    queryParamsHandling: 'merge', // remove to replace all query params by provided
                })
    
                this.formGroup.patchValue({ financier })
                this.fetchData()
            }
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.suretiesService.getSuretiesWithoutDocumentation(this.params).subscribe(suretys => {
            this.navigationService.loadBarFinish()
            this.dataSource = suretys
            this.length = suretys.length
            this.pageSize = suretys.length
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

}
