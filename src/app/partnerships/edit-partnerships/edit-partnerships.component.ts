import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogPartnershipItemsComponent } from '../dialog-partnership-items/dialog-partnership-items.component';
import { PartnershipItemModel } from '../partnership-item.model';
import { PartnershipsService } from '../partnerships.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { DialogSearchBusinessesComponent } from '../../businesses/dialog-search-businesses/dialog-search-businesses.component';

@Component({
    selector: 'app-edit-partnerships',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './edit-partnerships.component.html',
    styleUrls: ['./edit-partnerships.component.sass']
})
export class EditPartnershipsComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly partnershipsService: PartnershipsService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        _id: ['', Validators.required],
        document: '',
        name: ['', Validators.required],
        address: '',
        constitutedAt: '',
        email: '',
        phoneNumber: '',
        representativeNationality: '',
        representativeDocumentType: 'DNI',
        representativeDocument: ['', Validators.required],
        representativeName: ['', Validators.required],
        businessId: null,
    })
    isLoading: boolean = false
    partnershipItems: PartnershipItemModel[] = []
    private partnershipId: string = ''

    ngOnInit(): void {
        this.navigationService.setTitle('Editar consorcio')
        this.partnershipId = this.activatedRoute.snapshot.params['partnershipId']
        this.partnershipsService.getPartnershipById(this.partnershipId).subscribe(partnership => {
            this.partnershipItems = partnership.partnershipItems
            this.formGroup.patchValue(partnership)
        })
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

    removeBusiness(index: number): void {
        this.partnershipItems.splice(index, 1)
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.partnershipsService.update(this.formGroup.value, this.partnershipItems, this.partnershipId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage('Se han guardado los cambios')
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        }
    }
}
