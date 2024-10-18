import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsurancesService } from '../insurances.service';
import { NavigationService } from '../../navigation/navigation.service';
import { CommercialsService } from '../../commercials/commercials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TenderModel } from '../../tenders/tender.model';
import { CommercialModel } from '../../commercials/commercial.model';
import { InsuranceModel } from '../insurance.model';
import { Subscription } from 'rxjs';
import { DialogSearchTendersComponent } from '../../tenders/dialog-search-tenders/dialog-search-tenders.component';
import { DialogSearchCustomersComponent } from '../../customers/dialog-search-customers/dialog-search-customers.component';
import { DialogSearchFinanciersComponent } from '../../financiers/dialog-search-financiers/dialog-search-financiers.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { InsuranceType } from '../insurance-type.enum';
import { DialogAttachFileComponent, DialogAttachFileData } from '../dialog-attach-file/dialog-attach-file.component';

@Component({
  selector: 'app-edit-insurances',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-insurances.component.html',
  styleUrl: './edit-insurances.component.sass'
})
export class EditInsurancesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly insurancesService: InsurancesService,
        private readonly navigationService: NavigationService,
        private readonly commercialsService: CommercialsService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly matDialog: MatDialog,
        private readonly router: Router
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        observations: '',
        insuranceType: '',
        commercialId: ['', Validators.required],
        policyNumber: ['', Validators.required],
        expirationAt: ['', Validators.required],
        emitionAt: ['', Validators.required],
        prima: ['', Validators.required],
        commission: ['', Validators.required],
        currencyCode: 'PEN',
        tender: this.formBuilder.group({
            _id: null,
            objectDescription: '',
        }),
        customer: this.formBuilder.group({
            _id: [null, Validators.required],
            name: ['', Validators.required],
        }),
        financier: this.formBuilder.group({
            _id: ['', Validators.required],
            name: [null, Validators.required],
        }),
        isEmition: false,
    })

    tender: TenderModel | null = null
    isLoading: boolean = false
    commercials: CommercialModel[] = []
    insurances: InsuranceModel[] = []
    private insuranceId: string = ''
    private insuranceType: string = ''

    private handleCommercials$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
    }

    ngOnInit(): void {
        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        this.insuranceId = this.activatedRoute.snapshot.params['insuranceId']
        this.insuranceType = this.activatedRoute.snapshot.queryParams['insuranceType']
        this.formGroup.patchValue({ insuranceType: this.insuranceType })

        this.insurancesService.getInsuranceById(this.insuranceId).subscribe(insurance => {
            this.formGroup.patchValue(insurance)
        })

        switch (this.insuranceType) {
            case InsuranceType.SCTR:
                this.navigationService.setTitle('Editar seguro SCTR')
                break
            case InsuranceType.SOAT:
                this.navigationService.setTitle('Editar seguro SOAT')
                break
            case InsuranceType.VIDALEY:
                this.navigationService.setTitle('Editar Seguro Vida Ley')
                break
            case InsuranceType.POLIZACAR:
                this.navigationService.setTitle('Editar seguro Poliza CAR')
                break
            case InsuranceType.POLIZATREC:
                this.navigationService.setTitle('Editar seguro Poliza TREC')
                break
            case InsuranceType.POLIZAEAR:
                this.navigationService.setTitle('Editar seguro Poliza EAR')
                break
            case InsuranceType.POLIZAMULTIRRIESGOS:
                this.navigationService.setTitle('Editar seguro Poliza Multirriesgos')
                break
            case InsuranceType.RESCIVIL:
                this.navigationService.setTitle('Editar seguro Res. Civil')
                break
            case InsuranceType.VEHICULAR:
                this.navigationService.setTitle('Editar seguro Vehicular')
                break
            case InsuranceType.VIDA:
                this.navigationService.setTitle('Editar seguro Vida')
                break
            case InsuranceType.EPS:
                this.navigationService.setTitle('Editar seguro Poliza EAR')
                break
            case InsuranceType.SALUD:
                this.navigationService.setTitle('Editar seguro Salud')
                break
            case InsuranceType.ACCIDENTES:
                this.navigationService.setTitle('Editar seguro Accidentes')
                break
            case InsuranceType.FOLA:
                this.navigationService.setTitle('Editar Seguro Fola')
                break
            case InsuranceType.VIAJES:
                this.navigationService.setTitle('Editar seguro Viajes')
                break
            case InsuranceType.EMPRESARIAL:
                this.navigationService.setTitle('Editar seguro P. Empresarial')
                break

            default:
                break
        }
    }

    onAttachFile(fileType: string) {
        const data: DialogAttachFileData = {
            fileType,
            insuranceId: this.insuranceId
        }

        this.matDialog.open(DialogAttachFileComponent, {
            position: { top: '20px' },
            maxWidth: '80vw',
            data
        })
    }

    onDialogSearchTenders() {
        const dialogRef = this.matDialog.open(DialogSearchTendersComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(tender => {
            this.formGroup.patchValue({ tender })
        })
    }

    onDialogSearchCustomers() {
        const dialogRef = this.matDialog.open(DialogSearchCustomersComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(customer => {
            this.formGroup.patchValue({ customer })
        })
    }

    onDialogSearchFinanciers() {
        const dialogRef = this.matDialog.open(DialogSearchFinanciersComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(financier => {
            this.formGroup.patchValue({ financier })
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            const { customer, financier, tender, ...insurance } = this.formGroup.value
            insurance.tenderId = tender._id
            insurance.customerId = customer._id
            insurance.financierId = financier._id
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.insurancesService.update(insurance, this.insuranceId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage('Se han guardado los cambios')
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
