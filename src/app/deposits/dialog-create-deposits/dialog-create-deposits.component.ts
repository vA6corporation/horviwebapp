import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepositModel } from '../deposit.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-create-deposits',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-create-deposits.component.html',
    styleUrl: './dialog-create-deposits.component.sass'
})
export class DialogCreateDepositsComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public deposit: DepositModel | null,
        private readonly formBuilder: FormBuilder,
        private readonly matDialogRef: MatDialogRef<DialogCreateDepositsComponent>,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        price: [null, Validators.required],
        currencyCode: 'PEN'
    })

    ngOnInit(): void {
        if (this.deposit) {
            this.formGroup.patchValue(this.deposit)
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.matDialogRef.close(this.formGroup.value)
        }
    }

}
