import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommercialModel } from '../../commercials/commercial.model';
import { CommercialsService } from '../../commercials/commercials.service';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { CustomersService } from '../customers.service';

@Component({
    selector: 'app-edit-customers',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './edit-customers.component.html',
    styleUrls: ['./edit-customers.component.sass']
})
export class EditCustomersComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly customersService: CustomersService,
        private readonly navigationService: NavigationService,
        private readonly commercialsService: CommercialsService,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        documentType: ['RUC', Validators.required],
        document: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        address: ['', Validators.required],
        commercialId: ['', Validators.required],
        partnershipName: ''
    })
    isLoading: boolean = false
    commercials: CommercialModel[] = []
    private customerId: string = ''

    private handleCommercials$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Editar cliente')

        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        this.customerId = this.activatedRoute.snapshot.params['customerId']
        this.customersService.getCustomerById(this.customerId).subscribe(customer => {
            this.formGroup.patchValue(customer)
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.customersService.update(this.formGroup.value, this.customerId).subscribe({
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
