import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChequeModel } from '../cheque.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-create-cheques',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-create-cheques.component.html',
    styleUrl: './dialog-create-cheques.component.sass'
})
export class DialogCreateChequesComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly cheque: ChequeModel | null,
        private readonly formBuilder: FormBuilder,
        private readonly dialogRef: MatDialogRef<DialogCreateChequesComponent>,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        price: ['', Validators.required],
        paymentAt: ['', Validators.required],
        currencyCode: 'PEN',
        extensionAt: '',
        observations: '',
        isPaid: false,
    })

    ngOnInit(): void {
        if (this.cheque) {
            this.formGroup.patchValue(this.cheque)
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value)
        }
    }

}
