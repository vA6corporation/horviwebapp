import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavigationService } from '../../navigation/navigation.service';
import { ProvidersService } from '../providers.service';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-create-providers',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule],
    templateUrl: './create-providers.component.html',
    styleUrls: ['./create-providers.component.sass']
})
export class CreateProvidersComponent implements OnInit {

    constructor(
        private readonly providersService: ProvidersService,
        private readonly navigationService: NavigationService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
    ) { }

    formArray: FormArray = this.formBuilder.array([])
    formGroup: FormGroup = this.formBuilder.group({
        documentType: ['RUC', Validators.required],
        document: '',
        name: ['', Validators.required],
        email: ['', [Validators.email]],
        mobileNumber: '',
        birthDate: '',
        address: '',
        banks: this.formArray,
    })

    isLoading: boolean = false
    maxLength: number = 11

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo proveedor')

        this.formGroup.get('documentType')?.valueChanges.subscribe(value => {
            switch (value) {
                case 'RUC':
                    this.formGroup.get('document')?.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)])
                    this.maxLength = 11
                    break
                case 'DNI':
                    this.formGroup.get('document')?.setValidators([Validators.minLength(8), Validators.maxLength(8)])
                    this.maxLength = 8
                    break
                case 'CE':
                    this.formGroup.get('document')?.setValidators([Validators.minLength(9), Validators.maxLength(9)])
                    this.maxLength = 9
                    break
            }
            this.formGroup.get('document')?.updateValueAndValidity()
        })
    }

    onAddAccount() {
        const formGroup = this.formBuilder.group({
            bankName: 'BCP',
            accountNumber: [null, Validators.required],
        })
        this.formArray.push(formGroup)
    }

    onRemoveAccount(index: number) {
        this.formArray.removeAt(index)
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.providersService.create(this.formGroup.value, this.formArray.value).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/providers'])
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
