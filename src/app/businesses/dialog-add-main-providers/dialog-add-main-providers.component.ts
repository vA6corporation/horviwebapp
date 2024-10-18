import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-dialog-add-main-providers',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './dialog-add-main-providers.component.html',
  styleUrl: './dialog-add-main-providers.component.sass'
})
export class DialogAddMainProvidersComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly matDialogRef: MatDialogRef<DialogAddMainProvidersComponent>
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

    onSubmit() {
        if (this.formGroup.valid) {
            this.matDialogRef.close(this.formGroup.value)
        }
    }

}
