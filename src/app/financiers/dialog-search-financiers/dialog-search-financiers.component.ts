import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinanciersService } from '../financiers.service';
import { NavigationService } from '../../navigation/navigation.service';
import { FinancierModel } from '../financier.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-search-financiers',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dialog-search-financiers.component.html',
  styleUrl: './dialog-search-financiers.component.sass'
})
export class DialogSearchFinanciersComponent {

    constructor(
        private formBuilder: FormBuilder,
        private financiersService: FinanciersService,
        private navigationService: NavigationService,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        key: ['', Validators.required],
    })
    financiers: FinancierModel[] = []

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart()
            const { key } = this.formGroup.value
            this.formGroup.reset()
            this.financiersService.getFinanciersByKey(key).subscribe({
                next: financiers => {
                    this.navigationService.loadBarFinish()
                    this.financiers = financiers
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
