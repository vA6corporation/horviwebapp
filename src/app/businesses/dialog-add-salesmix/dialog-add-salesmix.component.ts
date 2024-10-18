import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-salesmix',
  templateUrl: './dialog-add-salesmix.component.html',
  styleUrls: ['./dialog-add-salesmix.component.sass']
})
export class DialogAddSalesmixComponent implements OnInit {

  constructor(private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogAddSalesmixComponent>) { }
    d = new Date();
    year = this.d.getFullYear();
  public formGroup: FormGroup = this.formBuilder.group({
    activity: [ null, Validators.required ],
    amountOne: [ null, Validators.required ],
    percentageOne: [ null, Validators.required ],
    amountTwo: [ null, Validators.required ],
    percentageTwo: [ null, Validators.required ],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
