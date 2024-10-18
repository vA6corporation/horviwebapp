import { Component } from '@angular/core';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommercialModel } from '../commercial.model';
import { PageEvent } from '@angular/material/paginator';
import { CommercialsService } from '../commercials.service';

@Component({
    selector: 'app-commercials',
    standalone: true,
    imports: [MaterialModule, CommonModule, RouterModule],
    templateUrl: './commercials.component.html',
    styleUrl: './commercials.component.sass'
})
export class CommercialsComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly commercialsService: CommercialsService,
    ) { }

    displayedColumns: string[] = ['name', 'actions']
    dataSource: CommercialModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    ngOnInit() {
        this.navigationService.setTitle('Comerciales')
        this.fetchData()
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.commercialsService.getCommercialsByPage(this.pageIndex + 1, this.pageSize).subscribe(commercials => {
            this.navigationService.loadBarFinish()
            this.dataSource = commercials
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

}
