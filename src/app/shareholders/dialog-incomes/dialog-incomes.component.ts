import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-incomes',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-incomes.component.html',
    styleUrls: ['./dialog-incomes.component.sass']
})
export class DialogIncomesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dialogRef: MatDialogRef<DialogIncomesComponent>
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        description: ['', Validators.required],
        amount: ['', Validators.required],
        typeIncome: ['', Validators.required],
        origin: ['', Validators.required],
    })

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value)
        }
    }

}
