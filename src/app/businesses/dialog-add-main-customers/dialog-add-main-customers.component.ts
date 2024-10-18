import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-add-main-customers',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-add-main-customers.component.html',
    styleUrls: ['./dialog-add-main-customers.component.sass'],
})
export class DialogAddMainCustomersComponent implements OnInit {
    
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dialogRef: MatDialogRef<DialogAddMainCustomersComponent>
    ) { }
    
    year = new Date().getFullYear()
    formGroup: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        document: ['', Validators.required],
        turnBusiness: ['', Validators.required],
        yearOne: [this.year - 1, Validators.required],
        itemOne: ['', Validators.required],
        priceOne: ['', Validators.required],
        shoppingOne: ['', Validators.required],
        yearTwo: [this.year, Validators.required],
        itemTwo: ['', Validators.required],
        priceTwo: ['', Validators.required],
        shoppingTwo: ['', Validators.required],
    })

    ngOnInit(): void { }

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value);
        }
    }
}
