import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaymentModel } from '../payment.model';
import { PaymentsService } from '../payments.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-payments',
    standalone: true,
    imports: [MaterialModule, RouterModule, CommonModule],
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.sass']
})
export class PaymentsComponent implements OnInit {

    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly navigationService: NavigationService,
    ) { }

    displayedColumns: string[] = ['paymentAt', 'bank', 'company', 'charge', 'type', 'actions']
    dataSource: PaymentModel[] = []
    length: number = 100
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    ngOnInit(): void {
        this.navigationService.setTitle('Honorarios')
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ])

        this.fetchData()
        this.fetchCount()
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.paymentsService.getPaymentsByPage(this.pageIndex + 1, this.pageSize).subscribe(payments => {
            this.navigationService.loadBarFinish()
            this.dataSource = payments
        })
    }

    fetchCount() {
        this.paymentsService.getCountPayments().subscribe(count => {
            this.length = count
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
        this.fetchCount()
    }

}
