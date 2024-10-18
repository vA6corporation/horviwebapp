import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FinancierModel } from '../financier.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FinanciersService } from '../financiers.service';

@Component({
    selector: 'app-financiers',
    standalone: true,
    imports: [MaterialModule, RouterModule, CommonModule],
    templateUrl: './financiers.component.html',
    styleUrls: ['./financiers.component.sass']
})
export class FinanciersComponent implements OnInit {

    constructor(
        private readonly financiersService: FinanciersService,
        private readonly navigationService: NavigationService,
    ) { }

    displayedColumns: string[] = ['document', 'name', 'actions']
    dataSource: FinancierModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Financieras')
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ])

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.financiersService.getFinanciersByKey(key).subscribe({
                next: financiers => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = financiers
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })

        this.fetchData()
        this.fetchCount()
    }

    fetchCount() {
        this.financiersService.getCountFinanciers().subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.financiersService.getFinanciersByPage(this.pageIndex + 1, this.pageSize).subscribe(financiers => {
            this.navigationService.loadBarFinish()
            this.dataSource = financiers
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

}
