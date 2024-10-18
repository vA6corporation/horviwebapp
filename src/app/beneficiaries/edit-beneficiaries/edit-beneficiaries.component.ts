import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BeneficiariesService } from '../beneficiaries.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-edit-beneficiaries',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './edit-beneficiaries.component.html',
    styleUrls: ['./edit-beneficiaries.component.sass']
})
export class EditBeneficiariesComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly beneficiariesService: BeneficiariesService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        document: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', Validators.email],
        mobileNumber: '',
        phoneNumber: '',
        annexed: '',
        address: '',
        legalRepresentative: '',
        positionLegalRepresentative: '',
        contactPerson: '',
        positioncontactPerson: '',
    })
    isLoading: boolean = false
    maxlength: number = 11
    private beneficiaryId: string = ''

    ngOnInit(): void {
        this.navigationService.setTitle('Editar beneficiario')

        this.beneficiaryId = this.activatedRoute.snapshot.params['beneficiaryId']
        this.beneficiariesService.getBeneficiaryById(this.beneficiaryId).subscribe(beneficiary => {
            this.formGroup.patchValue(beneficiary)
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.beneficiariesService.update(this.formGroup.value, this.beneficiaryId).subscribe({
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
