import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuretiesService } from '../sureties.service';
import { NavigationService } from '../../navigation/navigation.service';
import { TendersService } from '../../tenders/tenders.service';
import { CommercialsService } from '../../commercials/commercials.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommercialModel } from '../../commercials/commercial.model';
import { BeneficiaryModel } from '../../beneficiaries/beneficiary.model';
import { PartnershipModel } from '../../partnerships/partnership.model';
import { BusinessModel } from '../../businesses/business.model';
import { TenderModel } from '../../tenders/tender.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { HttpErrorResponse } from '@angular/common/http';
import { SuretyType } from '../sureties/surety-type.enum';
import { DialogSearchFinanciersComponent } from '../../financiers/dialog-search-financiers/dialog-search-financiers.component';
import { DialogSearchBeneficiariesComponent } from '../../beneficiaries/dialog-search-beneficiaries/dialog-search-beneficiaries.component';
import { DialogSearchBusinessesComponent } from '../../businesses/dialog-search-businesses/dialog-search-businesses.component';
import { DialogSearchPartnershipsComponent } from '../../partnerships/dialog-search-partnerships/dialog-search-partnerships.component';
import { DialogCreateChequesComponent } from '../../cheques/dialog-create-cheques/dialog-create-cheques.component';
import { DialogCreateDepositsComponent } from '../../deposits/dialog-create-deposits/dialog-create-deposits.component';
import { DepositModel } from '../../deposits/deposit.model';
import { ChequeModel } from '../../cheques/cheque.model';

@Component({
    selector: 'app-create-sureties',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './create-sureties.component.html',
    styleUrl: './create-sureties.component.sass'
})
export class CreateSuretiesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly suretiesService: SuretiesService,
        private readonly navigationService: NavigationService,
        private readonly tendersService: TendersService,
        private readonly commercialsService: CommercialsService,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        financier: this.formBuilder.group({
            name: ['', Validators.required],
            _id: [null, Validators.required],
        }),
        observations: '',
        policyNumber: ['', Validators.required],
        price: [null, Validators.required],
        pagare: null,
        startAt: [null, Validators.required],
        endAt: [null, Validators.required],
        guarantee: null,
        prima: null,
        commission: null,
        currencyCode: 'PEN',
        suretyType: ['', Validators.required],
        isEmition: false,
        isPayed: false,
    })

    tender: TenderModel | null = null
    business: BusinessModel | null = null
    partnership: PartnershipModel | null = null
    commercial: CommercialModel | null = null
    beneficiary: BeneficiaryModel | null = null
    isLoading: boolean = false
    deposits: DepositModel[] = []
    cheques: ChequeModel[] = []
    commercials: CommercialModel[] = []

    private handleCompanies$: Subscription = new Subscription()
    private handleBanks$: Subscription = new Subscription()
    private handleCommercials$: Subscription = new Subscription()
    private queryParams$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCompanies$.unsubscribe()
        this.handleBanks$.unsubscribe()
        this.handleCommercials$.unsubscribe()
        this.queryParams$.unsubscribe()
    }

    ngOnInit(): void {
        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        const tenderId = this.activatedRoute.snapshot.queryParams['tenderId']
        const suretyType = this.activatedRoute.snapshot.queryParams['suretyType']

        if (suretyType === SuretyType.MATERIAL) {
            this.navigationService.setTitle('Nueva fianza - Adelato de materiales')
        }

        if (suretyType === SuretyType.DIRECT) {
            this.navigationService.setTitle('Nueva fianza - Adelato directo')
        }

        if (suretyType === SuretyType.COMPLIANCE) {
            this.navigationService.setTitle('Nueva fianza - Fiel cumplimiento')
        }

        this.tendersService.getTenderById(tenderId).subscribe(tender => {
            this.tender = tender
            this.business = tender.business
            this.partnership = tender.partnership
            this.commercial = tender.commercial
            this.beneficiary = tender.beneficiary
            this.formGroup.patchValue({ suretyType })
        })
    }

    onDialogSearchFinanciers() {
        const dialogRef = this.matDialog.open(DialogSearchFinanciersComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(financier => {
            this.formGroup.patchValue({ financier: financier || {} });
        })
    }

    onDialogSearchBusinesses() {
        const dialogRef = this.matDialog.open(DialogSearchBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                this.formGroup.patchValue({ business })
            }
        })
    }

    onDialogSearchBeneficiaries() {
        const dialogRef = this.matDialog.open(DialogSearchBeneficiariesComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(beneficiary => {
            this.formGroup.patchValue({ beneficiary: beneficiary || {} })
        })
    }

    onDialogSearchPartnerships() {
        const dialogRef = this.matDialog.open(DialogSearchPartnershipsComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(partnership => {
            if (partnership) {
                const { business } = partnership
                this.formGroup.patchValue({ business: business || {} })
                this.formGroup.patchValue({ partnership: partnership || {} })
            }
        })
    }

    onDialogCreateCheques() {
        const dialogRef = this.matDialog.open(DialogCreateChequesComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(cheque => {
            if (cheque) {
                this.cheques.push(cheque)
            }
        })
    }

    onRemoveCheque(index: number) {
        const ok = confirm('Estas seguro de eliminar?...')
        if (ok) {
            this.cheques.splice(index, 1)
        }
    }

    onDialogCreateDeposits() {
        const dialogRef = this.matDialog.open(DialogCreateDepositsComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(deposit => {
            if (deposit) {
                this.deposits.push(deposit)
            }
        })
    }

    onRemoveDeposit(index: number) {
        const ok = confirm('Estas seguro de eliminar?...')
        if (ok) {
            this.deposits.splice(index, 1)
        }
    }

    onSubmit(): void {
        if (this.formGroup.valid && this.tender) {
            const { financier, ...surety } = this.formGroup.value
            surety.partnershipId = this.partnership?._id
            surety.businessId = this.business?._id
            surety.beneficiaryId = this.beneficiary?._id
            surety.financierId = financier._id
            surety.commercialId = this.commercial?._id
            surety.tenderId = this.tender._id
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.suretiesService.create(surety, this.cheques, this.deposits).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/sureties'])
                    this.navigationService.showMessage('Registrado correctamente')
                }, error: (error: HttpErrorResponse) => {
                    console.log(error)
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
