import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { FinancierModel } from './financier.model'

@Injectable({
    providedIn: 'root'
})
export class FinanciersService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getFinanciersByPage(pageIndex: number, pageSize: number): Observable<FinancierModel[]> {
        return this.httpService.get(`financiers/byPage/${pageIndex}/${pageSize}`)
    }

    getFinanciersByKey(key: string): Observable<FinancierModel[]> {
        return this.httpService.get(`financiers/byKey/${key}`)
    }

    getFinancierById(financierId: string): Observable<any> {
        return this.httpService.get(`financiers/byId/${financierId}`)
    }

    getCountFinanciers(): Observable<number> {
        return this.httpService.get('financiers/countFinanciers')
    }

    // getEmitionGuaranties(financierId: string): Observable<GuaranteeModel[]> {
    //     return this.httpService.get(`reports/${financierId}/emitionGuaranties`);
    // }

    create(financier: FinancierModel): Observable<any> {
        return this.httpService.post('financiers', { financier })
    }

    update(financier: FinancierModel, financierId: string): Observable<any> {
        return this.httpService.put(`financiers/${financierId}`, { financier })
    }
}
