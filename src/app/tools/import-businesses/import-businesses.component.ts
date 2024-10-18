import { Component } from '@angular/core';
import { NavigationService } from '../../navigation/navigation.service';
import { AuthService } from '../../auth/auth.service';
import { ToolsService } from '../tools.service';
import { Subscription } from 'rxjs';
import { parseExcel } from '../../build-excel';
import { MatTable } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-import-businesses',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './import-businesses.component.html',
  styleUrl: './import-businesses.component.sass'
})
export class ImportBusinessesComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly authService: AuthService,
        private readonly toolsService: ToolsService,
    ) { }

    displayedColumns: string[] = [
        'actions',
        // 'name',
        // 'feature',
        // 'brand',
        // 'category',
        // 'description',
        // 'stock',
        // 'unidad',
    ]
    dataSource: any[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0
    isLoading: boolean = false

    private handleAuth$: Subscription = new Subscription()
    private handlePriceLists$: Subscription = new Subscription()
    private handlePaymentMethods$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleAuth$.unsubscribe()
        this.handlePriceLists$.unsubscribe()
        this.handlePaymentMethods$.unsubscribe()
    }

    ngOnInit(): void {

    }

    async onFileSelected(files: FileList | null, input: HTMLInputElement, table: MatTable<any>) {
        if (files && files[0]) {
            const businesses = await parseExcel(files[0])
            input.value = ''
            this.dataSource = []
            this.dataSource = businesses
            console.log(businesses)
            // for (const product of products) {
            //     let expirationAt = null
            //     if (product.fechaVencimiento) {
            //         const dates = String(product.fechaVencimiento).split('/')
            //         expirationAt = new Date(Number(dates[2]), Number(dates[1]), Number(dates[0]))
            //     }
            //     if (product.nombre && product.categoria) {
            //         const importProduct: any = {
            //             printZone: (product.zonaImpresion || 'COCINA').toUpperCase(),
            //             name: product.nombre,
            //             feature: product.variante,
            //             brand: product.marca,
            //             category: product.categoria,
            //             description: product.descripcion,
            //             stock: product.stock,
            //             price: isNaN(product.precio) ? 0 : Number(product.precio.toFixed(2)),
            //             cost: isNaN(product.costo) ? 0 : Number(product.costo.toFixed(2)),
            //             upc: String(product.codigo || ''),
            //             sku: String(product.codigoInterno || ''),
            //             unidad: product.unidad || 'UNIDADES',
            //             expirationAt,
            //             lotNumber: product.lote || null,
            //             providerName: product.nombreProveedor || '',
            //             providerDocument: product.documentoProveedor || '',
            //         }

            //         this.dataSource.push(importProduct)
            //     }
            // }
            // this.displayedColumns.push('actions')
            table.renderRows()
        }
    }

    onDeleteProduct(index: number, table: MatTable<any>) {
        this.dataSource.splice(index, 1)
        table.renderRows()
    }

    async onSubmit() {
        this.navigationService.loadBarStart()
        this.toolsService.importBusineses(this.dataSource).subscribe(() => {
            this.navigationService.loadBarFinish()
        })
        // this.navigationService.loadBarStart()
        // this.isLoading = true
        // const chunk = 500
        // const promises: any[] = []
        // for (let index = 0; index < this.dataSource.length; index += chunk) {
        //     const temporary = this.dataSource.slice(index, index + chunk)
        //     const promise = lastValueFrom(this.toolsService.importProducts(temporary, this.priceLists, this.setting.defaultPrice, this.paymentMethodId))
        //     promises.push(promise)
        // }
        // try {
        //     await Promise.all(promises)
        //     this.navigationService.showMessage('Subido correctamente')
        //     this.dataSource = []
        //     this.isLoading = false
        //     this.navigationService.loadBarFinish()
        // } catch (error) {
        //     if (error instanceof HttpErrorResponse) {
        //         this.navigationService.showMessage(error.error.message)
        //     } else {
        //         this.navigationService.showMessage('Error desconocido')
        //     }
        //     this.navigationService.loadBarFinish()
        //     this.isLoading = false
        // }
    }

}
