import { Component } from '@angular/core';
import { NavigationService } from '../../navigation/navigation.service';
import { InsurancesService } from '../insurances.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { InsuranceModel } from '../insurance.model';
import { CommonModule, formatDate } from '@angular/common';
import { CommercialModel } from '../../commercials/commercial.model';
import { CommercialsService } from '../../commercials/commercials.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../material.module';
import { InsuranceType } from '../insurance-type.enum';
import { buildExcel } from '../../build-excel';

@Component({
    selector: 'app-insurances',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './insurances.component.html',
    styleUrl: './insurances.component.sass'
})
export class InsurancesComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly insurancesService: InsurancesService,
        private readonly commercialsService: CommercialsService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        commercialId: '',
        startDate: '',
        endDate: '',
    })
    displayedColumns: string[] = [
        'customer',
        'financier',
        'policyNumber',
        'emitionAt',
        'expirationAt',
        'prima',
        'observations',
        'actions',
    ]
    dataSource: InsuranceModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0
    insuranceType: string = ''
    commercials: CommercialModel[] = []
    private params: Params = {}

    private handleCommercials$: Subscription = new Subscription()
    private handleSearch$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()
    private queryParams$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
        this.handleSearch$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
        this.queryParams$.unsubscribe()
    }

    ngOnInit(): void {
        this.queryParams$ = this.activatedRoute.queryParams.subscribe(queryParams => {
            this.insuranceType = queryParams['insuranceType']
            Object.assign(this.params, { insuranceType: this.insuranceType })
            this.fetchData()
            this.fetchCount()
            switch (this.insuranceType) {
                case InsuranceType.SCTR:
                    this.navigationService.setTitle('Seguros SCTR')
                    break
                case InsuranceType.SOAT:
                    this.navigationService.setTitle('Seguros SOAT')
                    break
                case InsuranceType.VIDALEY:
                    this.navigationService.setTitle('Seguros Vida Ley')
                    break
                case InsuranceType.POLIZACAR:
                    this.navigationService.setTitle('Seguros Poliza CAR')
                    break
                case InsuranceType.POLIZATREC:
                    this.navigationService.setTitle('Seguros Poliza TREC')
                    break
                case InsuranceType.POLIZAEAR:
                    this.navigationService.setTitle('Seguros Poliza EAR')
                    break
                case InsuranceType.POLIZAMULTIRRIESGOS:
                    this.navigationService.setTitle('Seguros Poliza Multirriesgos')
                    break
                case InsuranceType.RESCIVIL:
                    this.navigationService.setTitle('Seguros Res. Civil')
                    break
                case InsuranceType.VEHICULAR:
                    this.navigationService.setTitle('Seguros Vehicular')
                    break
                case InsuranceType.VIDA:
                    this.navigationService.setTitle('Seguros Vida')
                    break
                case InsuranceType.EPS:
                    this.navigationService.setTitle('Seguros Poliza EAR')
                    break
                case InsuranceType.SALUD:
                    this.navigationService.setTitle('Seguros Salud')
                    break
                case InsuranceType.ACCIDENTES:
                    this.navigationService.setTitle('Seguros Accidentes')
                    break
                case InsuranceType.FOLA:
                    this.navigationService.setTitle('Seguros Fola')
                    break
                case InsuranceType.VIAJES:
                    this.navigationService.setTitle('Seguros Viajes')
                    break
                case InsuranceType.EMPRESARIAL:
                    this.navigationService.setTitle('Seguros P. Empresarial')
                    break

                default:
                    break
            }
        })


        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
        ])

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.insurancesService.getInsurancesByKey(key).subscribe({
                next: insurances => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = insurances
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

            if (id == 'export_excel') {
                this.navigationService.loadBarStart()

                const chunk = 500
                const promises: Promise<any>[] = []

                for (let index = 0; index < this.length / chunk; index++) {
                    const promise = this.insurancesService.getInsurancesByPage(index + 1, chunk, this.params).toPromise()
                    promises.push(promise)
                }

                const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]

                Promise.all(promises).then(values => {
                    this.navigationService.loadBarFinish()
                    const insurances: InsuranceModel[] = values.flat()

                    let body = []
                    body.push([
                        'N° DE POLIZA',
                        'F. DE EMISION',
                        'F. DE VENCIMIENTO',
                        'CONSORCIO',
                        'EMPRESA',
                        'FINANCIERA',
                        'BROKER',
                        'PRIMA',
                        'COMISION'
                    ])

                    for (const insurance of insurances) {
                        body.push([
                            insurance.policyNumber,
                            formatDate(new Date(insurance.emitionAt), 'dd/MM/yyyy', 'en-US'),
                            formatDate(new Date(insurance.expirationAt), 'dd/MM/yyyy', 'en-US'),
                            // insurance.partnership?.name,
                            insurance.business.name,
                            insurance.financier.name,
                            insurance.commercial.name.toUpperCase(),
                            Number(insurance.prima.toFixed(2)),
                            Number(insurance.commission.toFixed(2))
                        ])
                    }

                    const name = `SEGUROS_${this.insuranceType}_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`
                    buildExcel(body, name, wscols, [], [])
                })
            }
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

    // onShowDetails(materialId: string) {
    //     this.matDialog.open(DialogMaterialComponent, {
    //         position: { top: '20px' },
    //         data: materialId,
    //     })
    // }

    async onDelete(insuranceId: string) {
        const ok = confirm('Esta seguro de eliminar?...')
        if (ok) {
            this.insurancesService.delete(insuranceId).subscribe(() => {
                this.navigationService.showMessage('Eliminado correctamente')
                this.dataSource = this.dataSource.filter(e => e._id !== insuranceId)
            })
        }
    }

    fetchCount() {
        this.insurancesService.getCountInsurances(this.params).subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.insurancesService.getInsurancesByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe({
            next: insurances => {
                console.log(insurances)
                this.navigationService.loadBarFinish()
                this.dataSource = insurances
            }, error: (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage(error.error.message)
            }
        })
    }

}
