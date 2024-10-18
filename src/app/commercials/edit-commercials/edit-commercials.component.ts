import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { CommercialModel } from '../commercial.model';
import { CommercialsService } from '../commercials.service';

@Component({
    selector: 'app-edit-commercials',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './edit-commercials.component.html',
    styleUrl: './edit-commercials.component.sass'
})
export class EditCommercialsComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commercialsService: CommercialsService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
    })
    isLoading: boolean = false
    commercialId: string = ''
    commercials: CommercialModel[] = []

    private handleCommercials$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Editar comercial')
        
        this.commercialId = this.activatedRoute.snapshot.params['commercialId']
        this.commercialsService.getCommercialById(this.commercialId).subscribe(commercial => {
            this.formGroup.patchValue(commercial)
        })

        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.commercialsService.update(this.formGroup.value, this.commercialId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.commercialsService.loadCommercials()
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
