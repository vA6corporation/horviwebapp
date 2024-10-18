import { Component } from '@angular/core';
import { PartnershipsService } from '../partnerships.service';
import { NavigationService } from '../../navigation/navigation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartnershipModel } from '../partnership.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-search-partnerships',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dialog-search-partnerships.component.html',
  styleUrl: './dialog-search-partnerships.component.sass'
})
export class DialogSearchPartnershipsComponent {

    constructor(
        private readonly partnershipsService: PartnershipsService,
        private readonly navigationService: NavigationService,
        private readonly formBuilder: FormBuilder
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        key: ['', Validators.required],
    })
    partnerships: PartnershipModel[] = []

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart()
            const { key } = this.formGroup.value
            this.formGroup.reset()
            this.partnershipsService.getPartnershipsByKey(key).subscribe({
                next: partnerships => {
                    this.navigationService.loadBarFinish()
                    this.partnerships = partnerships
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
