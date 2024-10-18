import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { FinanciersService } from '../financiers.service';

@Component({
    selector: 'app-edit-financiers',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule],
    templateUrl: './edit-financiers.component.html',
    styleUrls: ['./edit-financiers.component.sass']
})
export class EditFinanciersComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly financiersService: FinanciersService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        document: ['', Validators.required],
        name: ['', Validators.required],
    })

    isLoading: boolean = false
    private financierId: string = ''

    ngOnInit(): void {
        this.navigationService.setTitle('Editar financiera')
        this.financierId = this.activatedRoute.snapshot.params['financierId']
        this.financiersService.getFinancierById(this.financierId).subscribe(financier => {
            this.formGroup.patchValue(financier)
        })
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.financiersService.update(this.formGroup.value, this.financierId).subscribe({
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
