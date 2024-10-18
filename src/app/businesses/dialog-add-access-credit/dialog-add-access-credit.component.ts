import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-access-credit',
  templateUrl: './dialog-add-access-credit.component.html',
  styleUrls: ['./dialog-add-access-credit.component.sass'],
})
export class DialogAddAccessCreditComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogAddAccessCreditComponent>
  ) {}

  public formGroup: FormGroup = this.formBuilder.group({
    insuranceCarrier: ['', Validators.required],
    financialProducts: ['', Validators.required],
    creditLine: ['', Validators.required],
    amount: ['', Validators.required],
    typeGuarantee: ['', Validators.required],
    amountGuarantee: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
