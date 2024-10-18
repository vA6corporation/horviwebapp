import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { DialogPartnershipItemsComponent } from '../dialog-partnership-items/dialog-partnership-items.component';
import { PartnershipItemModel } from '../partnership-item.model';
import { PartnershipsService } from '../partnerships.service';
import { DialogSearchBusinessesComponent } from '../../businesses/dialog-search-businesses/dialog-search-businesses.component';

@Component({
    selector: 'app-create-partnerships',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './create-partnerships.component.html',
    styleUrls: ['./create-partnerships.component.sass']
})
export class CreatePartnershipsComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly partnershipsService: PartnershipsService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
        private readonly matDialog: MatDialog,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        document: '',
        name: ['', Validators.required],
        address: '',
        constitutedAt: '',
        email: '',
        phoneNumber: '',
        representativeDocumentType: 'DNI',
        representativeNationality: ['', Validators.required],
        representativeDocument: ['', Validators.required],
        representativeName: ['', Validators.required],
        businessId: null,
    })
    isLoading: boolean = false
    partnershipItems: PartnershipItemModel[] = []

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo consorcio')
    }

    onDialogSearchBusinesses(): void {
        const dialogRef = this.matDialog.open(DialogSearchBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                const dialogRef = this.matDialog.open(DialogPartnershipItemsComponent, {
                    width: '600px',
                    position: { top: '20px' },
                    data: business
                })

                dialogRef.afterClosed().subscribe(partnershipItem => {
                    if (partnershipItem) {
                        this.partnershipItems.push(partnershipItem)
                    }
                })
            }
        })
    }

    onRemovePartnershipItem(index: number): void {
        this.partnershipItems.splice(index, 1)
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.partnershipsService.create(this.formGroup.value, this.partnershipItems).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.router.navigate(['/partnerships'])
                    this.navigationService.showMessage('Registrado correctamente')
                }, error: (error: HttpErrorResponse) => {
                    console.log(error)
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }
}
