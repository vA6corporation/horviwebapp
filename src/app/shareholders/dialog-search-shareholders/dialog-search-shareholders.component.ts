import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShareholdersService } from '../shareholders.service';
import { NavigationService } from '../../navigation/navigation.service';
import { ShareholderModel } from '../shareholder.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog-search-shareholders',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './dialog-search-shareholders.component.html',
    styleUrl: './dialog-search-shareholders.component.sass'
})
export class DialogSearchShareholdersComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly shareholdersService: ShareholdersService,
        private readonly navigationService: NavigationService,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        key: ['', Validators.required],
    })
    shareholders: ShareholderModel[] = []

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart()
            const { key } = this.formGroup.value
            this.formGroup.reset()
            this.shareholdersService.getShareholdersByKey(key).subscribe({
                next: shareholders => {
                    this.navigationService.loadBarFinish()
                    this.shareholders = shareholders
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

}
