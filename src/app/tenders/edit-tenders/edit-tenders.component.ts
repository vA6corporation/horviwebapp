import { Component } from '@angular/core';
import { TendersService } from '../tenders.service';
import { NavigationService } from '../../navigation/navigation.service';
import { CommercialsService } from '../../commercials/commercials.service';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserModel } from '../../users/user.model';
import { CommercialModel } from '../../commercials/commercial.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { DialogSearchBeneficiariesComponent } from '../../beneficiaries/dialog-search-beneficiaries/dialog-search-beneficiaries.component';
import { DialogSearchBusinessesComponent } from '../../businesses/dialog-search-businesses/dialog-search-businesses.component';
import { DialogSearchPartnershipsComponent } from '../../partnerships/dialog-search-partnerships/dialog-search-partnerships.component';
import { DialogAttachFileComponent, DialogAttachFileData } from '../dialog-attach-file/dialog-attach-file.component';

@Component({
    selector: 'app-edit-tenders',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './edit-tenders.component.html',
    styleUrl: './edit-tenders.component.sass'
})
export class EditTendersComponent {

    constructor(
        private readonly tendersService: TendersService,
        private readonly navigationService: NavigationService,
        private readonly commercialsService: CommercialsService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        objectDescription: ['', Validators.required],
        awardedAmount: ['', Validators.required],
        observations: '',
        emitionAt: [null, Validators.required],
        commercialId: [null, Validators.required],
        processStatusCode: '01',
        constructionCode: '01',
        commission: null,
        partnership: this.formBuilder.group({
            _id: null,
            name: '',
        }),
        business: this.formBuilder.group({
            _id: [null, Validators.required],
            name: ['', Validators.required],
        }),
        beneficiary: this.formBuilder.group({
            _id: [null, Validators.required],
            name: ['', Validators.required],
        }),
    })
    isLoading: boolean = false
    user: UserModel | null = null
    tenderId: string = ''

    commercials: CommercialModel[] = []
    months: string[] = [
        'ENERO',
        'FEBRERO',
        'MARZO',
        'ABRIL',
        'MAYO',
        'JUNIO',
        'JULIO',
        'AGOSTO',
        'SEPTIEMBRE',
        'OCTUBRE',
        'NOVIEMBRE',
        'DICIEMBRE',
    ]

    private handleCommercials$: Subscription = new Subscription()
    private handleAuth$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
        this.handleAuth$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Editar obra')

        this.tenderId = this.activatedRoute.snapshot.params['tenderId']

        this.tendersService.getTenderById(this.tenderId).subscribe(tender => {
            this.formGroup.patchValue(tender)
        })

        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user
        })

    }

    // onDialogPercentCompletions() {
    //     const dialogRef = this.matDialog.open(DialogPercentCompletionsComponent, {
    //         width: '600px',
    //         position: { top: '20px' }
    //     });

    //     dialogRef.afterClosed().subscribe(percentCompletion => {
    //         if (percentCompletion) {
    //             this.percentCompletions.push(percentCompletion);
    //         }
    //     });
    // }

    // onDialogPayments() {
    //     const dialogRef = this.matDialog.open(DialogPaymentsComponent, {
    //         width: '600px',
    //         position: { top: '20px' }
    //     });

    //     dialogRef.afterClosed().subscribe(payment => {
    //         if (payment) {
    //             this.payments.push(payment);
    //         }
    //     });
    // }

    // onRemovePercentCompletion(index: number) {
    //     this.percentCompletions.splice(index, 1);
    // }

    // onRemovePayment(index: number) {
    //     this.payments.splice(index, 1);
    // }

    onDialogSearchBusinesses() {
        const dialogRef = this.matDialog.open(DialogSearchBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                this.formGroup.patchValue({ business });
            }
        });
    }

    onAttachFile(fileType: string) {
        const data: DialogAttachFileData = {
            fileType,
            tenderId: this.tenderId
        }

        this.matDialog.open(DialogAttachFileComponent, {
            position: { top: '20px' },
            maxWidth: '80vw',
            data
        })
    }

    onDialogSearchBeneficiaries() {
        const dialogRef = this.matDialog.open(DialogSearchBeneficiariesComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(beneficiary => {
            if (beneficiary) {
                this.formGroup.patchValue({ beneficiary })
            }
        })
    }

    onDialogSearchPartnerships() {
        const dialogRef = this.matDialog.open(DialogSearchPartnershipsComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(partnership => {
            if (partnership) {
                const { business } = partnership;
                this.formGroup.patchValue({ business: business || {} });
                this.formGroup.patchValue({ partnership: partnership || {} });
            }
        });
    }

    async onSubmit() {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            const { business, partnership, beneficiary, ...construction } = this.formGroup.value
            construction.businessId = business._id
            construction.partnershipId = partnership._id
            construction.beneficiaryId = beneficiary._id
            this.tendersService.update(construction, this.tenderId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/tenders'])
                    this.navigationService.showMessage('Registrado correctamente')
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
