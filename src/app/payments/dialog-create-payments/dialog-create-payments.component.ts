import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BanksService } from '../../banks/banks.service';
import { MaterialModule } from '../../material.module';
import { BankModel } from '../../providers/bank.model';

@Component({
    selector: 'app-dialog-create-payments',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './dialog-create-payments.component.html',
    styleUrls: ['./dialog-create-payments.component.sass']
})
export class DialogCreatePaymentsComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly banksService: BanksService,
        private readonly dialogRef: MatDialogRef<DialogCreatePaymentsComponent>,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        charge: [null, Validators.required],
        paymentAt: [new Date(), Validators.required],
        bankId: ['', Validators.required],
        companyId: ['', Validators.required],
    })
    banks: BankModel[] = []

    private handleCompanies$: Subscription = new Subscription()
    private handleBanks$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCompanies$.unsubscribe()
        this.handleBanks$.unsubscribe()
    }

    ngOnInit(): void {
        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks
        })
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value)
        }
    }

}
