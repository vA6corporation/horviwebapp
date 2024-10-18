import { Component, EventEmitter } from '@angular/core';
import { CustomerModel } from '../customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { NavigationService } from '../../navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog-search-customers',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './dialog-search-customers.component.html',
    styleUrl: './dialog-search-customers.component.sass'
})
export class DialogSearchCustomersComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly customersService: CustomersService,
        private readonly navigationService: NavigationService,
    ) { }

    customers: CustomerModel[] = []
    formGroup: FormGroup = this.formBuilder.group({
        key: ['', Validators.required],
    })
    isLoading: boolean = false

    private createCustomer: EventEmitter<void> = new EventEmitter()

    handleCreateCustomer() {
        return this.createCustomer
    }

    onCreateCustomer() {
        this.createCustomer.next()
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart()
            const { key } = this.formGroup.value
            this.formGroup.reset()
            this.isLoading = true
            this.customersService.getCustomersByKey(key).subscribe({
                next: customers => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.customers = customers
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
