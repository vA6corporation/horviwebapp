import { Component } from '@angular/core';
import { TendersService } from '../tenders.service';
import { NavigationService } from '../../navigation/navigation.service';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../material.module';
import { TenderModel } from '../tender.model';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchFinanciersComponent } from '../../financiers/dialog-search-financiers/dialog-search-financiers.component';

@Component({
  selector: 'app-without-documentation-tenders',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule],
  templateUrl: './without-documentation-tenders.component.html',
  styleUrl: './without-documentation-tenders.component.sass'
})
export class WithoutDocumentationTendersComponent {

    constructor(
        private readonly tendersService: TendersService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['code', 'advance', 'partnership', 'tender', 'legal', 'buenapro', 'nombramiento', 'document', 'actions']
    dataSource: TenderModel[] = []
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
        this.navigationService.setTitle('Documentacion faltante obras')

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

    hasFile(tender: TenderModel, fileType: string): boolean {
        return !tender.nodes.map(e => e.fileType).includes(fileType)
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
        this.tendersService.getTendersWithoutDocumentation(this.params).subscribe(tenders => {
            this.navigationService.loadBarFinish()
            this.dataSource = tenders
            this.length = tenders.length
            this.pageSize = tenders.length
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

}
