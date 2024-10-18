import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommercialModel } from '../../commercials/commercial.model';
import { CommercialsService } from '../../commercials/commercials.service';
import { DialogSearchCustomersComponent } from '../../customers/dialog-search-customers/dialog-search-customers.component';
import { DialogSearchFinanciersComponent } from '../../financiers/dialog-search-financiers/dialog-search-financiers.component';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { DialogSearchTendersComponent } from '../../tenders/dialog-search-tenders/dialog-search-tenders.component';
import { TenderModel } from '../../tenders/tender.model';
import { InsuranceType } from '../insurance-type.enum';
import { InsuranceModel } from '../insurance.model';
import { InsurancesService } from '../insurances.service';

@Component({
    selector: 'app-create-insurances',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './create-insurances.component.html',
    styleUrl: './create-insurances.component.sass'
})
export class CreateInsurancesComponent {

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

    private insuranceType: string = ''
    private insuranceGroupId: string = ''

    private handleCommercials$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
    }

    ngOnInit(): void {
        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        this.insuranceType = this.activatedRoute.snapshot.queryParams['insuranceType']
        this.insuranceGroupId = this.activatedRoute.snapshot.queryParams['insuranceGroupId'] || null

        if (this.insuranceGroupId) {
            this.insurancesService.getInsurancesByInsuranceGroup(this.insuranceGroupId).subscribe(insurances => {
                this.insurances = insurances
            })
        }

        this.formGroup.patchValue({ insuranceType: this.insuranceType })
        if (this.insuranceGroupId) {
            switch (this.insuranceType) {
                case InsuranceType.SCTR:
                    this.navigationService.setTitle('Renovar seguro SCTR')
                    break
                case InsuranceType.SOAT:
                    this.navigationService.setTitle('Renovar seguro SOAT')
                    break
                case InsuranceType.VIDALEY:
                    this.navigationService.setTitle('Renovar seguro Vida Ley')
                    break
                case InsuranceType.POLIZACAR:
                    this.navigationService.setTitle('Renovar seguro Poliza CAR')
                    break
                case InsuranceType.POLIZATREC:
                    this.navigationService.setTitle('Renovar seguro Poliza TREC')
                    break
                case InsuranceType.POLIZAEAR:
                    this.navigationService.setTitle('Renovar seguro Poliza EAR')
                    break
                case InsuranceType.POLIZAMULTIRRIESGOS:
                    this.navigationService.setTitle('Renovar seguro Poliza Multirriesgos')
                    break
                case InsuranceType.RESCIVIL:
                    this.navigationService.setTitle('Renovar seguro Res. Civil')
                    break
                case InsuranceType.VEHICULAR:
                    this.navigationService.setTitle('Renovar seguro Vehicular')
                    break
                case InsuranceType.VIDA:
                    this.navigationService.setTitle('Renovar seguro Vida')
                    break
                case InsuranceType.EPS:
                    this.navigationService.setTitle('Renovar seguro Poliza EAR')
                    break
                case InsuranceType.SALUD:
                    this.navigationService.setTitle('Renovar seguro Salud')
                    break
                case InsuranceType.ACCIDENTES:
                    this.navigationService.setTitle('Renovar seguro Accidentes')
                    break
                case InsuranceType.FOLA:
                    this.navigationService.setTitle('Renovar seguro Fola')
                    break
                case InsuranceType.VIAJES:
                    this.navigationService.setTitle('Renovar seguro Viajes')
                    break
                case InsuranceType.EMPRESARIAL:
                    this.navigationService.setTitle('Renovar seguro P. Empresarial')
                    break

                default:
                    break
            }
        } else {
            switch (this.insuranceType) {
                case InsuranceType.SCTR:
                    this.navigationService.setTitle('Nuevo seguro SCTR')
                    break
                case InsuranceType.SOAT:
                    this.navigationService.setTitle('Nuevo seguro SOAT')
                    break
                case InsuranceType.VIDALEY:
                    this.navigationService.setTitle('Nuevo seguro Vida Ley')
                    break
                case InsuranceType.POLIZACAR:
                    this.navigationService.setTitle('Nuevo seguro Poliza CAR')
                    break
                case InsuranceType.POLIZATREC:
                    this.navigationService.setTitle('Nuevo seguro Poliza TREC')
                    break
                case InsuranceType.POLIZAEAR:
                    this.navigationService.setTitle('Nuevo seguro Poliza EAR')
                    break
                case InsuranceType.POLIZAMULTIRRIESGOS:
                    this.navigationService.setTitle('Nuevo seguro Poliza Multirriesgos')
                    break
                case InsuranceType.RESCIVIL:
                    this.navigationService.setTitle('Nuevo seguro Res. Civil')
                    break
                case InsuranceType.VEHICULAR:
                    this.navigationService.setTitle('Nuevo seguro Vehicular')
                    break
                case InsuranceType.VIDA:
                    this.navigationService.setTitle('Nuevo seguro Vida')
                    break
                case InsuranceType.EPS:
                    this.navigationService.setTitle('Nuevo seguro Poliza EAR')
                    break
                case InsuranceType.SALUD:
                    this.navigationService.setTitle('Nuevo seguro Salud')
                    break
                case InsuranceType.ACCIDENTES:
                    this.navigationService.setTitle('Nuevo seguro Accidentes')
                    break
                case InsuranceType.FOLA:
                    this.navigationService.setTitle('Nuevo seguro Fola')
                    break
                case InsuranceType.VIAJES:
                    this.navigationService.setTitle('Nuevo seguro Viajes')
                    break
                case InsuranceType.EMPRESARIAL:
                    this.navigationService.setTitle('Nuevo seguro P. Empresarial')
                    break

                default:
                    break
            }
        }
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
            this.insurancesService.create(insurance, this.insuranceGroupId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage('Registrado correctamente')
                    this.router.navigate(['/insurances'], { queryParams: { insuranceType: this.insuranceType } })
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
