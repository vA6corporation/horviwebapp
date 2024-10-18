import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BeneficiariesService } from '../beneficiaries.service';
import { NavigationService } from '../../navigation/navigation.service';
import { BeneficiaryModel } from '../beneficiary.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-search-beneficiaries',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dialog-search-beneficiaries.component.html',
  styleUrl: './dialog-search-beneficiaries.component.sass'
})
export class DialogSearchBeneficiariesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly beneficiariesService: BeneficiariesService,
        private readonly navigationService: NavigationService,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        key: ['', Validators.required],
    })
    beneficiaries: BeneficiaryModel[] = []

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart()
            const { key } = this.formGroup.value
            this.formGroup.reset()
            this.beneficiariesService.getBeneficiariesByKey(key).subscribe({
                next: beneficiaries => {
                    this.navigationService.loadBarFinish()
                    this.beneficiaries = beneficiaries
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
