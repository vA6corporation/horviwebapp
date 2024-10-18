import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { ExperienceModel } from '../experience.model';

@Component({
    selector: 'app-dialog-edit-experiences',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-edit-experiences.component.html',
    styleUrls: ['./dialog-edit-experiences.component.sass']
})
export class DialogEditExperiencesComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly experience: ExperienceModel,
        private readonly formBuilder: FormBuilder,
        private readonly dialogRef: MatDialogRef<DialogEditExperiencesComponent>
    ) { }

    ngOnInit() {
        this.formGroup.patchValue(this.experience)
        for (const experiencePartnership of this.experience.experiencePartnerships) {
            const formGroup = this.formBuilder.group({
                name: [experiencePartnership.name, Validators.required],
                participationPercent: [experiencePartnership.participationPercent, Validators.required]
            })
            this.formArray.push(formGroup)
        }        
    }

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
