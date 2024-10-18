import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TendersService } from '../tenders.service';
import { NavigationService } from '../../navigation/navigation.service';
import { TenderModel } from '../tender.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog-search-tenders',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './dialog-search-tenders.component.html',
    styleUrl: './dialog-search-tenders.component.sass'
})
export class DialogSearchTendersComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly tendersService: TendersService,
        private readonly navigationService: NavigationService,
    ) { }

    tenders: TenderModel[] = []
    formGroup: FormGroup = this.formBuilder.group({
        key: [null, Validators.required],
    })

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart()
            const { key } = this.formGroup.value
            this.formGroup.reset()
            this.tendersService.getTendersByPageKey(1, 100, key).subscribe({
                next: tenders => {
                    this.navigationService.loadBarFinish()
                    this.tenders = tenders
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
