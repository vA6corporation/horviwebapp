import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { ShareholderModel } from '../shareholder.model';
import { ShareholdersService } from '../shareholders.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-shareholders',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './shareholders.component.html',
    styleUrls: ['./shareholders.component.sass']
})
export class ShareholdersComponent implements OnInit {

    constructor(
        private readonly shareholdersService: ShareholdersService,
        private readonly navigationService: NavigationService,
        // private readonly matDialog: MatDialog,
    ) { }

    displayedColumns: string[] = ['document', 'name', 'email', 'mobileNumber', 'actions']
    dataSource: ShareholderModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    private handleSearch$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Accionistas')

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
        ])

        this.shareholdersService.getShareholdersCount().subscribe(count => {
            this.length = count
        })

        this.shareholdersService.getShareholdersByPage(this.pageIndex + 1, this.pageSize).subscribe(shareholders => {
            this.dataSource = shareholders
        })

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.shareholdersService.getShareholdersByKey(key).subscribe(shareholders => {
                this.dataSource = shareholders
            })
        })
    }

    onShowConstructions(businessId: string) {
        // const dialogRef = this.matDialog.open(DialogConstructionBusinessesComponent, {
        //     width: '600px',
        //     position: { top: '20px' },
        //     data: businessId,
        // })
    }

    // onDeleteShareholder(shareholderId: string) {
    //     this.shareholdersService.delete()
    // }

    handlePageEvent(event: PageEvent): void {
        this.shareholdersService.getShareholdersByPage(event.pageIndex + 1, event.pageSize).subscribe(shareholders => {
            this.dataSource = shareholders
        })
    }

}
