import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CustomersService } from '../customers.service';
import { NavigationService } from '../../navigation/navigation.service';
import { CommercialModel } from '../../commercials/commercial.model';
import { CommercialsService } from '../../commercials/commercials.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog-create-customers',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './dialog-create-customers.component.html',
    styleUrls: ['./dialog-create-customers.component.sass']
})
export class DialogCreateCustomersComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly customersService: CustomersService,
        private readonly navigationService: NavigationService,
        private readonly commercialsService: CommercialsService,
        private readonly matDialogRef: MatDialogRef<DialogCreateCustomersComponent>,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
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

    private handleCommercials$: Subscription = new Subscription()
    private handleCertifiers$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
        this.handleCertifiers$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo cliente ISO')

        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.customersService.create(this.formGroup.value).subscribe({
                next: customer => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage('Registrado correctamente')
                    this.matDialogRef.close(customer)
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
