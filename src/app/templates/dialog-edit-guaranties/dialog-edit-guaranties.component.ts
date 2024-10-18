import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { GuaranteeModel } from '../guarantee.model';

@Component({
    selector: 'app-dialog-edit-guaranties',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-edit-guaranties.component.html',
    styleUrls: ['./dialog-edit-guaranties.component.sass']
})
export class DialogEditGuarantiesComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly guarantee: GuaranteeModel,
        private readonly formBuilder: FormBuilder,
        private readonly dialogRef: MatDialogRef<DialogEditGuarantiesComponent>,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        guaranteeType: 'GAMF',
        startAt: [null, Validators.required],
        endAt: [null, Validators.required],
        daysLimit: [null, Validators.required],
        amount: [null, Validators.required],
        currencyCode: 'PEN'
    })

    ngOnInit(): void {
        this.formGroup.patchValue(this.guarantee)
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value)
        }
    }

}
