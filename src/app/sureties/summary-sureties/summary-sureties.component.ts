import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommercialsService } from '../../commercials/commercials.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationService } from '../../navigation/navigation.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommercialModel } from '../../commercials/commercial.model';
import { Subscription } from 'rxjs';
import { SuretiesService } from '../sureties.service';
import { randomColor } from '../../random-color';
import { DialogSearchFinanciersComponent } from '../../financiers/dialog-search-financiers/dialog-search-financiers.component';
import { DialogSearchBusinessesComponent } from '../../businesses/dialog-search-businesses/dialog-search-businesses.component';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-summary-sureties',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './summary-sureties.component.html',
    styleUrl: './summary-sureties.component.sass'
})
export class SummarySuretiesComponent {

    constructor(
        private readonly commercialsService: CommercialsService,
        private readonly navigationService: NavigationService,
        private readonly suretiesService: SuretiesService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    @ViewChild('collectionChartPrice')
    private collectionChartPrice!: ElementRef<HTMLCanvasElement>

    chartPrice: Chart | null = null
    chartPrima: Chart | null = null

    formGroup: FormGroup = this.formBuilder.group({
        commercialId: '',
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        financier: this.formBuilder.group({
            name: '',
            _id: '',
        }),
        business: this.formBuilder.group({
            name: '',
            _id: '',
        }),
        isEmition: '',
    })

    commercials: CommercialModel[] = []
    compliancePrima: number = 0
    materialPrima: number = 0
    directPrima: number = 0

    compliancePrice: number = 0
    materialPrice: number = 0
    directPrice: number = 0

    emitionCount: number = 0
    renovationCount: number = 0
    private params: Params = {}

    private sureties: string[] = ["F. CUMPLIMIENTO", "A. DIRECTO", "A. DE MATERIALES"]

    private handleCommercials$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()
    private queryParams$: Subscription = new Subscription()

    months: any[] = [
        'ENERO',
        'FEBRERO',
        'MARZO',
        'ABRIL',
        'MAYO',
        'JUNIO',
        'JULIO',
        'AGOSTO',
        'SEPTIEMBRE',
        'OCTUBRE',
        'NOVIEMBRE',
        'DICIEMBRE',
    ]

    ngOnDestroy() {
        this.handleCommercials$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
        this.queryParams$.unsubscribe()
    }

    ngOnInit() {
        Chart.register(...registerables)
        this.navigationService.setTitle("Suma asegurada")

        this.navigationService.setMenu([
            { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
        ])

        this.handleCommercials$ = this.commercialsService.handleCommercials().subscribe(commercials => {
            this.commercials = commercials
        })

        const { startDate, endDate } = this.activatedRoute.snapshot.params
        if (startDate && endDate) {
            Object.assign(this.params, {
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            })
            this.formGroup.patchValue({ startDate: new Date(startDate), endDate: new Date(endDate) })
        }
        this.fetchData()

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            switch (id) {
                case 'excel_simple':
                    this.navigationService.loadBarStart()
                    const { startDate, endDate, workerId, financier } = this.formGroup.value

                    const params: Params = {
                        startDate, endDate, workerId, financierId: financier._id
                    }

                    // this.suretiesService.getPrimasByRangeDateWorker(
                    //     params
                    // ).subscribe(collection => {
                    //     const { payedDirect, notPayedDirect, payedCompliance, notPayedCompliance, payedMaterial, notPayedMaterial } = collection
                    //     this.navigationService.loadBarFinish()
                    //     const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
                    //     let body = []
                    //     body.push([
                    //         'MES DE EMISION',
                    //         'AÑO DE EMISION',
                    //         'GARANTIA',
                    //         'FINANCIERA',
                    //         'CONSORCIO',
                    //         'CLIENTE',
                    //         'N° DE POLIZA',
                    //         'SUMA ASEGURADA',
                    //         'PRIMA',
                    //         'PAGADO',
                    //         'E. DE TRAMITE',
                    //         'E. DE REVISION',
                    //         'F. CUMPLIMIENTO',
                    //         'OFICINA',
                    //         'EMISION',
                    //         'OBRA'
                    //     ])

                    //     for (const guarantee of payedCompliance) {
                    //         const { business, partnership, financier } = guarantee
                    //         body.push([
                    //             this.months[new Date(guarantee.startDate).getMonth()],
                    //             new Date(guarantee.startDate).getFullYear(),
                    //             guarantee.guaranteeType,
                    //             financier?.name || null,
                    //             partnership?.name || null,
                    //             business?.name || null,
                    //             guarantee.policyNumber,
                    //             guarantee.price,
                    //             guarantee.prima,
                    //             guarantee.isPaid ? 'PAGADO' : 'NO PAGADO',
                    //             guarantee.processStatus,
                    //             guarantee.statusLabel,
                    //             formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    //             guarantee.office.name.toUpperCase(),
                    //             guarantee.isEmition ? 'SI' : 'NO',
                    //             guarantee.construction?.object
                    //         ])
                    //     }

                    //     for (const guarantee of payedDirect) {
                    //         const { business, partnership, financier } = guarantee
                    //         body.push([
                    //             this.months[new Date(guarantee.startDate).getMonth()],
                    //             new Date(guarantee.startDate).getFullYear(),
                    //             guarantee.guaranteeType,
                    //             financier?.name || null,
                    //             partnership?.name || null,
                    //             business?.name || null,
                    //             guarantee.policyNumber,
                    //             guarantee.price,
                    //             guarantee.prima,
                    //             guarantee.isPaid ? 'PAGADO' : 'NO PAGADO',
                    //             guarantee.processStatus,
                    //             guarantee.statusLabel,
                    //             formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    //             guarantee.office.name.toUpperCase(),
                    //             guarantee.isEmition ? 'SI' : 'NO',
                    //             guarantee.construction?.object
                    //         ])
                    //     }

                    //     for (const guarantee of payedMaterial) {
                    //         const { business, partnership, financier } = guarantee
                    //         body.push([
                    //             this.months[new Date(guarantee.startDate).getMonth()],
                    //             new Date(guarantee.startDate).getFullYear(),
                    //             guarantee.guaranteeType,
                    //             financier?.name || null,
                    //             partnership?.name || null,
                    //             business?.name || null,
                    //             guarantee.policyNumber,
                    //             guarantee.price,
                    //             guarantee.prima,
                    //             guarantee.isPaid ? 'PAGADO' : 'NO PAGADO',
                    //             guarantee.processStatus,
                    //             guarantee.statusLabel,
                    //             formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    //             guarantee.office.name.toUpperCase(),
                    //             guarantee.isEmition ? 'SI' : 'NO',
                    //             guarantee.construction?.object
                    //         ])
                    //     }

                    //     const name = `SUMAS_ASEGURADAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`
                    //     buildExcel(body, name, wscols, [], [])
                    // })
                    break

                default:
                    break
            }
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.suretiesService.getSummarySureties(
            this.params
        ).subscribe(summarySureties => {
            this.navigationService.loadBarFinish()
            const { material, direct, compliance } = summarySureties
            const colors = [randomColor(), randomColor(), randomColor()]

            this.emitionCount = 0
            this.renovationCount = 0

            this.emitionCount = material.emitionCount + direct.emitionCount + compliance.emitionCount
            this.renovationCount = material.renovationCount + direct.renovationCount + compliance.renovationCount

            this.compliancePrice = compliance.emitionPrice + compliance.renovationPrice
            this.directPrice = direct.emitionPrice + direct.renovationPrice
            this.materialPrice = material.emitionPrice + material.renovationPrice

            const dataPrice = {
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: [this.compliancePrice, this.directPrice, this.materialPrice],
                        backgroundColor: colors,
                        fill: true
                    },
                ]
            }

            const configPrice = {
                type: 'pie' as ChartType,
                data: dataPrice,
                plugins: [ChartDataLabels],
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            backgroundColor: function (ctx) {
                                return 'rgba(73, 79, 87, 0.5)'
                            },
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: (value, ctx) => {
                                let sum = 0
                                let dataArr = ctx.chart.data.datasets[0].data
                                dataArr.map(data => {
                                    sum += Number(data)
                                });
                                let percentage = (value * 100 / sum).toFixed(0) + "%";
                                // return percentage
                                if (value) {
                                    return `${this.sureties[ctx.dataIndex]} ${percentage}`
                                } else {
                                    return null
                                }
                            },
                            padding: 6
                        },
                    }
                } as ChartOptions,
            }

            const canvasPrice = this.collectionChartPrice.nativeElement
            this.chartPrice?.destroy()
            this.chartPrice = new Chart(canvasPrice, configPrice)
        })
    }

    onChangeEmition() {
        const { isEmition } = this.formGroup.value
        const queryParams: Params = { isEmition }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })

        Object.assign(this.params, queryParams)
        this.fetchData()
    }

    onDialogSearchFinanciers() {
        const dialogRef = this.matDialog.open(DialogSearchFinanciersComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(financier => {
            if (financier) {
                this.formGroup.patchValue({ financier })
                Object.assign(this.params, { financierId: financier._id })
            } else {
                this.formGroup.patchValue({ financier: { name: null, _id: null } })
                Object.assign(this.params, { financierId: null })
            }
            this.fetchData()
        })
    }

    onCommercialChange() {
        const { commercialId } = this.formGroup.value
        const queryParams: Params = { commercialId, pageIndex: 0, key: null }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        })

        Object.assign(this.params, queryParams)
        this.fetchData()
    }

    onRangeChange() {
        if (this.formGroup.valid) {
            const { startDate, endDate } = this.formGroup.value
            const queryParams: Params = { startDate, endDate, pageIndex: 0, key: null }

            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            })

            Object.assign(this.params, queryParams)
            this.fetchData()
        }
    }

    onChange() {
        this.fetchData()
    }


}
