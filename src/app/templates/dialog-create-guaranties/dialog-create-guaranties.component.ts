import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-create-guaranties',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-create-guaranties.component.html',
    styleUrl: './dialog-create-guaranties.component.sass'
})
export class DialogCreateGuarantiesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dialogRef: MatDialogRef<DialogCreateGuarantiesComponent>,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        guaranteeType: 'GAMF',
        startAt: [null, Validators.required],
        endAt: [null, Validators.required],
        daysLimit: [null, Validators.required],
        amount: [null, Validators.required],
        currencyCode: 'PEN'
    })

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value)
        }
    }

}
