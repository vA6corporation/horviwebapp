import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { ChequeModel } from './cheque.model';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ChequesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getCountCheques(): Observable<number> {
        return this.httpService.get('cheques/countCheques')
    }

    getChequesByPage(
        pageIndex: number,
        pageSize: number,
        params: Params,
    ): Observable<ChequeModel[]> {
        return this.httpService.get(`cheques/byPage/${pageIndex}/${pageSize}`, params)
    }

    create(cheque: any): Observable<ChequeModel> {
        return this.httpService.post('cheques', { cheque })
    }

    update(cheque: any, chequeId: string): Observable<void> {
        return this.httpService.put(`cheques/${chequeId}`, { cheque })
    }

    delete(chequeId: any): Observable<void> {
        return this.httpService.delete(`cheques/${chequeId}`)
    }

}
