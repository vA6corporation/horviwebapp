import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BeneficiariesService } from '../beneficiaries.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-create-beneficiaries',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule],
    templateUrl: './create-beneficiaries.component.html',
    styleUrls: ['./create-beneficiaries.component.sass']
})
export class CreateBeneficiariesComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly beneficiariesService: BeneficiariesService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        document: ['', Validators.required],
        name: ['', Validators.required],
        email: '',
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

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo beneficiario')
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.beneficiariesService.create(this.formGroup.value).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/beneficiaries'])
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
