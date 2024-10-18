import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TemplateModel } from '../template.model';
import { TemplatesService } from '../templates.service';
import { NavigationService } from '../../navigation/navigation.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { DialogTemplatesComponent } from '../dialog-templates/dialog-templates.component';

@Component({
    selector: 'app-templates',
    standalone: true,
    imports: [MaterialModule, CommonModule, RouterModule],
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.sass']
})
export class TemplatesComponent implements OnInit {

    constructor(
        private readonly templatesService: TemplatesService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['business', 'partnership', 'beneficiary', 'actions']
    dataSource: TemplateModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    private handleClickMenu$: Subscription = new Subscription()
    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Formatos')
        this.fetchData()

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.templatesService.getTemplatesByKey(key).subscribe(templates => {
                this.navigationService.loadBarFinish()
                this.dataSource = templates
            })
        })

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            // { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
        ])
    }

    onDialogTemplates(template: TemplateModel) {
        this.matDialog.open(DialogTemplatesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: template,
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize

        const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })

        this.fetchData()
    }

    fetchData() {
        this.templatesService.getTemplatesCount().subscribe(count => {
            this.length = count
        })

        this.navigationService.loadBarStart()
        this.templatesService.getTemplatesByPage(this.pageIndex + 1, this.pageSize).subscribe(providers => {
            this.navigationService.loadBarFinish()
            console.log(providers)

            this.dataSource = providers
        })
    }

    onDelete(templateId: string) {
        // const ok = confirm('Esta seguro de eliminar?...')
        // if (ok) {
        //   this.providersService.delete(providerId).subscribe(() => {
        //     this.navigationService.showMessage('Eliminado correctamente')
        //     this.fetchData()
        //   }, (error: HttpErrorResponse) => {
        //     this.navigationService.showMessage(error.error.message)
        //   })
        // }
    }

}
