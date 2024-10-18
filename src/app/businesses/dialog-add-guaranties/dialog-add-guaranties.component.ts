import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-guaranties',
  templateUrl: './dialog-add-guaranties.component.html',
  styleUrls: ['./dialog-add-guaranties.component.sass']
})
export class DialogAddGuarantiesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogAddGuarantiesComponent>
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    tenderObjectContract: [ null, Validators.required ],
    advancePercent: [ null, Validators.required ],
    faithfulComplianceO: [ null, Validators.required ],
    directAdvanceO: [ null, Validators.required ],
    advanceMaterialsO: [ null, Validators.required ],
    faithfulComplianceV: [ null, Validators.required ],
    directAdvanceV: [ null, Validators.required ],
    advanceMaterialsV: [ null, Validators.required ],
    nameSuretyEntities: [ null, Validators.required ],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
