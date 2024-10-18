import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessModel } from '../../businesses/business.model';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-partnership-items',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-partnership-items.component.html',
    styleUrls: ['./dialog-partnership-items.component.sass']
})
export class DialogPartnershipItemsComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly business: BusinessModel,
        private readonly dialogRef: MatDialogRef<DialogPartnershipItemsComponent>,
        private readonly formBuilder: FormBuilder,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        percent: ['', Validators.required]
    })

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const { percent } = this.formGroup.value
            this.dialogRef.close({
                business: this.business,
                businessId: this.business._id,
                percent
            })
        }
    }

}
