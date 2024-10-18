import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommercialsService } from '../commercials.service';
import { NavigationService } from '../../navigation/navigation.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-create-commercials',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './create-commercials.component.html',
    styleUrl: './create-commercials.component.sass'
})
export class CreateCommercialsComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commercialsService: CommercialsService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
    })
    isLoading: boolean = false

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo comercial')
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.commercialsService.create(this.formGroup.value).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/commercials'])
                    this.commercialsService.loadCommercials()
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
