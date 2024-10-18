import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { DialogIncomesComponent } from '../dialog-incomes/dialog-incomes.component';
import { IncomeModel } from '../income.model';
import { ShareholdersService } from '../shareholders.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-shareholders',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './create-shareholders.component.html',
    styleUrls: ['./create-shareholders.component.sass']
})
export class CreateShareholdersComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly shareholdersService: ShareholdersService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        documentType: ['', Validators.required],
        document: ['', Validators.required],
        name: ['', Validators.required],
        email: '',
        nationality: ['', Validators.required],
        maritalStatus: ['', Validators.required],
        percent: ['', Validators.required],
        mobileNumber: '',
        phoneNumber: '',
        annexed: '',
        birthDate: '',

        countryOrigin: '',
        addressResidence: '',
        countryResidence: '',
        districtResidence: '',
        provinceResidence: '',
        departmentResidence: '',

        professionOccupation: '',
        position: '',
        PEPInstitution: '',
        PEPPositionn: '',

        isPublicCompaniesCurrently: false,
        isPublicCompaniesLastFiveYear: false,
        publicCompaniesInstitute: '',
        publicCompaniesPosition: '',
        publicCompaniesTime: '',

        // Spouse
        documentTypeSpouse: '',
        documentSpouse: '',
        nameSpouse: '',
        nationalitySpouse: '',
        maritalStatusSpouse: '',
        birthDateSpouse: '',
    })
    isLoading: boolean = false
    maxlength: number = 11

    // properties: PropertyModel[] = []
    // movableProperties: MovablePropertyModel[] = []
    // investments: InvestmentModel[] = []
    incomes: IncomeModel[] = []
    // isCheckedPEP = false
    // isCheckedPC = false
    // private shareholderId: string = ''

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo accionista')

        this.formGroup.get('documentType')?.valueChanges.subscribe(value => {
            switch (value) {
                case 'RUC':
                    this.formGroup.get('documento')?.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)])
                    this.maxlength = 11
                    break
                case 'DNI':
                    this.formGroup.get('documento')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)])
                    this.maxlength = 8
                    break
            }
            this.formGroup.get('documento')?.updateValueAndValidity()
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()

            // if (!this.isCheckedPEP) {
            //     this.formGroup.controls['PEPInstitution'].setValue('')
            //     this.formGroup.controls['PEPPositionn'].setValue('')
            // }

            // if (!this.isCheckedPC) {
            //     this.formGroup.controls['publicCompaniesInstitute'].setValue('')
            //     this.formGroup.controls['publicCompaniesPosition'].setValue('')
            //     this.formGroup.controls['publicCompaniesTime'].setValue('')
            // }

            this.shareholdersService.create(this.formGroup.value).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/shareholders'])
                    this.navigationService.showMessage('Registrador correctamente')
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }

    onRemoveProperty(index: number) {
        // this.properties.splice(index, 1)
    }

    onRemoveMovableProperty(index: number) {
        // this.movableProperties.splice(index, 1)
    }

    onDialogProperties() {
        // const dialogRef = this.matDialog.open(DialogPropertiesComponent, {
        //     width: '600px',
        //     position: { top: '20px' }
        // })

        // dialogRef.afterClosed().subscribe(property => {
        //     if (property) {
        //         this.properties.push(property)
        //     }
        // })
    }

    onDialogIncomes() {
        const dialogRef = this.matDialog.open(DialogIncomesComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(income => {
            if (income) {
                this.incomes.push(income)
            }
        })
    }

    onRemoveIncome(index: number) {
        this.incomes.splice(index, 1)
    }

    onDialogMovableProperties() {
        // const dialogRef = this.matDialog.open(DialogMovablePropertiesComponent, {
        //     width: '600px',
        //     position: { top: '20px' }
        // })

        // dialogRef.afterClosed().subscribe(movableProperty => {
        //     if (movableProperty) {
        //         this.movableProperties.push(movableProperty)
        //     }
        // })
    }

    onRemoveInvestment(index: number) {
        // this.investments.splice(index, 1)
    }

    onDialogInvestments() {
        // const dialogRef = this.matDialog.open(DialogInvestmentsComponent, {
        //     width: '600px',
        //     position: { top: '20px' }
        // })

        // dialogRef.afterClosed().subscribe(investment => {
        //     if (investment) {
        //         this.investments.push(investment)
        //     }
        // })
    }

}
