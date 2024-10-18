import { Component } from '@angular/core';
import { ChequesService } from '../cheques.service';
import { NavigationService } from '../../navigation/navigation.service';
import { ChequeModel } from '../cheque.model';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-cheques',
    standalone: true,
    imports: [MaterialModule, RouterModule, ReactiveFormsModule, CommonModule],
    templateUrl: './cheques.component.html',
    styleUrl: './cheques.component.sass'
})
export class ChequesComponent {

    constructor(
        private readonly chequesService: ChequesService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['suretyLabel', 'price', 'paymentAt', 'extensionAt', 'policyNumber', 'business', 'actions']
    dataSource: ChequeModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0
    formGroup: FormGroup = this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        isPaid: false,
    })
    private params: Params = {
        isPaid: false
    }

    private handleAuth$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()
    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy(): void {
        this.handleAuth$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
        this.handleSearch$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Garantias')

        this.navigationService.setMenu([
            { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
            { id: 'search', icon: 'search', show: true, label: '' },
        ])

        // this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
        //     this.navigationService.loadBarStart()
        //     this.chequesService.getUsersByKey(key).subscribe({
        //         next: cheques => {
        //             this.navigationService.loadBarFinish()
        //             this.dataSource = cheques
        //         }, error: (error: HttpErrorResponse) => {
        //             this.navigationService.loadBarFinish()
        //             this.navigationService.showMessage(error.error.message)
        //         }
        //     })
        // })

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            // switch (id) {
            //     case 'excel_simple':
            //         this.navigationService.loadBarFinish()
            //         const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
            //         let body = []
            //         body.push([
            //             'NOMBRE',
            //             'EMAIL',
            //         ])
            //         for (const cheque of this.dataSource) {
            //             body.push([
            //                 cheque.name,
            //                 cheque.email,
            //             ])
            //         }
            //         const name = `USUARIOS`
            //         buildExcel(body, name, wscols, [], [])
            //         break

            //     default:
            //         break
            // }
        })

        this.fetchData()
        this.fetchCount()
    }

    fetchCount() {
        this.chequesService.getCountCheques().subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.chequesService.getChequesByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(cheques => {
            this.navigationService.loadBarFinish()
            this.dataSource = cheques
        })
    }

    onPaymentChange() {
        const { isPaid } = this.formGroup.value
        const queryParams: Params = { isPaid }
        Object.assign(this.params, { isPaid })
    
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: queryParams, 
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        })
    
        this.fetchData()
      }

    onNotPaid(cheque: ChequeModel) {
        cheque.isPaid = false
        this.chequesService.update(cheque, cheque._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios')
            this.fetchData()
        })
    }

    onPaid(cheque: ChequeModel) {
        const ok = confirm('Esta seguro de marcar el pago?...')
        if (ok) {
            cheque.isPaid = true
            this.chequesService.update(cheque, cheque._id).subscribe(() => {
                this.navigationService.showMessage('Se han guardado los cambios')
                this.fetchData()
            })
        }
    }

    onRangeChange() {
        if (this.formGroup.valid) {
            this.pageIndex = 0
            const { startDate, endDate } = this.formGroup.value
            const queryParams: Params = { startDate: startDate, endDate: endDate, pageIndex: 0 }
            Object.assign(this.params, { startDate, endDate })

            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            })

            this.fetchData()
        }
    }

    onDeleteUser(chequeId: string) {
        const ok = confirm('Estas seguro de eliminar?...')
        if (ok) {
            this.navigationService.loadBarStart()
            this.chequesService.delete(chequeId).subscribe(() => {
                this.navigationService.loadBarFinish()
                this.dataSource = this.dataSource.filter(e => e._id !== chequeId)
            })
        }
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

}
