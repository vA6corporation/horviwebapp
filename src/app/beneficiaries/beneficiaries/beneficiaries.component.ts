import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { BeneficiariesService } from '../beneficiaries.service';
import { BeneficiaryModel } from '../beneficiary.model';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-beneficiaries',
    standalone: true,
    imports: [MaterialModule, RouterModule, CommonModule],
    templateUrl: './beneficiaries.component.html',
    styleUrls: ['./beneficiaries.component.sass']
})
export class BeneficiariesComponent implements OnInit {

    constructor(
        private readonly beneficiariesService: BeneficiariesService,
        private readonly navigationService: NavigationService,
    ) { }

    private handleSearch$: Subscription = new Subscription()

    displayedColumns: string[] = ['document', 'name', 'email', 'mobileNumber', 'actions']
    dataSource: BeneficiaryModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Beneficiarios')
        
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ])

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.beneficiariesService.getBeneficiariesByKey(key).subscribe({
                next: beneficiaries => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = beneficiaries
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })

        this.fetchData()
    }

    fetchCount() {
        this.beneficiariesService.getBeneficiariesCount().subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.beneficiariesService.getBeneficiariesByPage(this.pageIndex + 1, this.pageSize).subscribe({
            next: beneficiaries => {
                this.navigationService.loadBarFinish()
                this.dataSource = beneficiaries
            }, error: (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            }
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.beneficiariesService.getBeneficiariesByPage(event.pageIndex + 1, event.pageSize).subscribe(beneficiaries => {
            this.dataSource = beneficiaries
        })
    }

}
