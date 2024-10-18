import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CustomersService } from '../customers.service';
import { CustomerModel } from '../customer.model';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [MaterialModule, RouterModule, CommonModule],
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit {

    constructor(
        private readonly customersService: CustomersService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['document', 'name', 'partnershipName', 'email', 'mobileNumber', 'actions']
    dataSource: CustomerModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    ngOnInit(): void {
        this.navigationService.setTitle('Clientes')

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ])

        const { pageIndex, pageSize } = this.activatedRoute.snapshot.queryParams

        if (pageIndex && pageSize) {
            this.pageIndex = Number(pageIndex)
            this.pageSize = Number(pageSize)
        }

        this.fetchData()
        this.fetchCount()
    }

    fetchCount() {
        this.customersService.getCountCustomers().subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.customersService.getCustomersByPage(this.pageIndex + 1, this.pageSize).subscribe(customers => {
            this.navigationService.loadBarFinish()
            this.dataSource = customers
        })
    }

    handlePageEvent(event: PageEvent): void {
        const { pageIndex, pageSize } = event
        this.pageIndex = pageIndex
        this.pageSize = pageSize

        const queryParams: Params = { pageIndex, pageSize }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })

        this.fetchData()
    }

}
