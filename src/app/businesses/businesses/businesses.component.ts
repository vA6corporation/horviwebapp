import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';

@Component({
    selector: 'app-businesses',
    standalone: true,
    imports: [
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './businesses.component.html',
    styleUrl: './businesses.component.sass'
})
export class BusinessesComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly businessesService: BusinessesService,
    ) { }

    displayedColumns: string[] = ['document', 'name', 'email', 'mobileNumber', 'actions']
    dataSource: BusinessModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 20]
    pageIndex: number = 0

    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    ngOnInit() {
        this.navigationService.setTitle('Empresas')

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.businessesService.getBusinessesByKey(key).subscribe({
                next: businesses => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = businesses
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })

        this.navigationService.setMenu([
            { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
            { id: 'search', icon: 'search', show: true, label: '' },
        ])

        this.fetchData()
        this.fetchCount()
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.businessesService.getBusinessesByPage(this.pageIndex + 1, this.pageSize).subscribe(businesses => {
            this.navigationService.loadBarFinish()
            this.dataSource = businesses
        })
    }

    fetchCount() {
        this.businessesService.getCountBusinesses().subscribe(count => {
            this.length = count
        })
    }

}
