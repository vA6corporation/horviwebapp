import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomersService } from '../customers.service';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../navigation/navigation.service';
import { CommercialsService } from '../../commercials/commercials.service';
import { CommercialModel } from '../../commercials/commercial.model';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-customers',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './create-customers.component.html',
    styleUrls: ['./create-customers.component.sass']
})
export class CreateCustomersComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly customersService: CustomersService,
        private readonly navigationService: NavigationService,
        private readonly commercialsService: CommercialsService,
        private readonly router: Router,
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

    private handleCommercials$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo cliente')

        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.customersService.create(this.formGroup.value).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/customers'])
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
