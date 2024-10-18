import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-create-experiences',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-create-experiences.component.html',
    styleUrl: './dialog-create-experiences.component.sass'
})
export class DialogCreateExperiencesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dialogRef: MatDialogRef<DialogCreateExperiencesComponent>
    ) { }

    formArray: FormArray = this.formBuilder.array([])
    formGroup: FormGroup = this.formBuilder.group({
        convener: ['', Validators.required],
        objectDescription: ['', Validators.required],
        objectContract: ['', Validators.required],
        signaturedAt: ['', Validators.required],
        startAt: ['', Validators.required],
        endAt: ['', Validators.required],
        location: ['', Validators.required],
        price: ['', Validators.required],
        daysLimit: ['', Validators.required],
        advancedPercent: ['', Validators.required],
        experiencePartnerships: this.formArray,
        isCompleted: false,
        isOperator: false,
    })

    onAddExperiencePartnership() {
        const experiencePartnership = this.formBuilder.group({
            name: ['', Validators.required],
            participationPercent: ['', Validators.required]
        })
        this.formArray.push(experiencePartnership)
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value)
        }
    }

}
