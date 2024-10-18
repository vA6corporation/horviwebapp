import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessesService } from '../businesses.service';
import { NavigationService } from '../../navigation/navigation.service';
import { BusinessModel } from '../business.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog-search-businesses',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './dialog-search-businesses.component.html',
    styleUrl: './dialog-search-businesses.component.sass'
})
export class DialogSearchBusinessesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        key: ['', Validators.required],
    })
    businesses: BusinessModel[] = []

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart()
            const key = this.formGroup.get('key')?.value
            this.formGroup.reset()
            this.businessesService.getBusinessesByKey(key).subscribe({
                next: businesses => {
                    this.navigationService.loadBarFinish()
                    this.businesses = businesses
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
