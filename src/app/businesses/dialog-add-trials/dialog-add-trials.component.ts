import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-trials',
  templateUrl: './dialog-add-trials.component.html',
  styleUrls: ['./dialog-add-trials.component.sass']
})
export class DialogAddTrialsComponent implements OnInit {

  constructor(private readonly formBuilder: FormBuilder, private readonly dialogRef: MatDialogRef<DialogAddTrialsComponent>) { }
  public formGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    reason: ['', Validators.required],
    amount: ['', Validators.required],
    court: ['', Validators.required],
    proceedings: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
