import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuretiesService } from '../sureties.service';
import { NavigationService } from '../../navigation/navigation.service';
import { TendersService } from '../../tenders/tenders.service';
import { CommercialsService } from '../../commercials/commercials.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { TenderModel } from '../../tenders/tender.model';
import { BusinessModel } from '../../businesses/business.model';
import { PartnershipModel } from '../../partnerships/partnership.model';
import { CommercialModel } from '../../commercials/commercial.model';
import { BeneficiaryModel } from '../../beneficiaries/beneficiary.model';
import { Subscription } from 'rxjs';
import { SuretyType } from '../sureties/surety-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogSearchFinanciersComponent } from '../../financiers/dialog-search-financiers/dialog-search-financiers.component';
import { DialogSearchBusinessesComponent } from '../../businesses/dialog-search-businesses/dialog-search-businesses.component';
import { DialogSearchBeneficiariesComponent } from '../../beneficiaries/dialog-search-beneficiaries/dialog-search-beneficiaries.component';
import { DialogSearchPartnershipsComponent } from '../../partnerships/dialog-search-partnerships/dialog-search-partnerships.component';
import { DialogAttachFileComponent, DialogAttachFileData } from '../dialog-attach-file/dialog-attach-file.component';
import { CommonModule } from '@angular/common';
import { ChequeModel } from '../../cheques/cheque.model';
import { DialogCreateChequesComponent } from '../../cheques/dialog-create-cheques/dialog-create-cheques.component';
import { DialogCreateDepositsComponent } from '../../deposits/dialog-create-deposits/dialog-create-deposits.component';
import { DepositModel } from '../../deposits/deposit.model';
import { ChequesService } from '../../cheques/cheques.service';
import { DepositsService } from '../../deposits/deposits.service';

@Component({
    selector: 'app-edit-sureties',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './edit-sureties.component.html',
    styleUrl: './edit-sureties.component.sass'
})
export class EditSuretiesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly suretiesService: SuretiesService,
        private readonly chequesService: ChequesService,
        private readonly depositsService: DepositsService,
        private readonly navigationService: NavigationService,
        private readonly tendersService: TendersService,
        private readonly commercialsService: CommercialsService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
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
    cheques: ChequeModel[] = []
    deposits: DepositModel[] = []
    commercials: CommercialModel[] = []
    suretyId: string = ''

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

        this.suretyId = this.activatedRoute.snapshot.params['suretyId']
        this.suretiesService.getSuretyById(this.suretyId).subscribe(surety => {
            this.cheques = surety.cheques
            this.deposits = surety.deposits
            if (surety.suretyType === SuretyType.MATERIAL) {
                this.navigationService.setTitle('Editar fianza - Adelato de materiales')
            }
    
            if (surety.suretyType === SuretyType.DIRECT) {
                this.navigationService.setTitle('Editar fianza - Adelato directo')
            }
    
            if (surety.suretyType === SuretyType.COMPLIANCE) {
                this.navigationService.setTitle('Editar fianza - Fiel cumplimiento')
            }

            this.formGroup.patchValue(surety)
    
            this.tendersService.getTenderById(surety.tenderId).subscribe(tender => {
                this.tender = tender
                this.business = tender.business
                this.partnership = tender.partnership
                this.commercial = tender.commercial
                this.beneficiary = tender.beneficiary
                this.formGroup.patchValue({ suretyType: surety.suretyType })
            })
        })
    }

    onDialogCreateCheques() {
        const dialogRef = this.matDialog.open(DialogCreateChequesComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(cheque => {
            if (cheque) {
                cheque.suretyId = this.suretyId
                this.navigationService.loadBarStart()
                this.chequesService.create(cheque).subscribe(cheque => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage('Se han guardado los cambios')
                    this.cheques.push(cheque)
                })
            }
        })
    }

    onRemoveCheque(index: number) {
        const ok = confirm('Estas seguro de eliminar?...')
        if (ok) {
            const cheque = this.cheques[index]
            this.navigationService.loadBarStart()
            this.chequesService.delete(cheque._id).subscribe(() => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage('Se han guardado los cambios')
                this.cheques.splice(index, 1)
            })
        }
    }

    onDialogCreateDeposits() {
        const dialogRef = this.matDialog.open(DialogCreateDepositsComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(deposit => {
            if (deposit) {
                deposit.suretyId = this.suretyId
                this.navigationService.loadBarStart()
                this.depositsService.create(deposit).subscribe(deposit => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage('Se han guardado los cambios')
                    this.deposits.push(deposit)
                })
            }
        })
    }

    onRemoveDeposit(index: number) {
        const ok = confirm('Estas seguro de eliminar?...')
        if (ok) {
            const deposit = this.deposits[index]
            this.navigationService.loadBarStart()
            this.depositsService.delete(deposit._id).subscribe(() => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage('Se han guardado los cambios')
                this.deposits.splice(index, 1)
            })
        }
    }

    onAttachFile(fileType: string) {
        const data: DialogAttachFileData = {
            fileType,
            suretyId: this.suretyId
        }

        this.matDialog.open(DialogAttachFileComponent, {
            position: { top: '20px' },
            maxWidth: '80vw',
            data
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
            this.suretiesService.update(surety, this.suretyId).subscribe({
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
