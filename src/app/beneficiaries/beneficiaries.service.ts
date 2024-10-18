import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { BeneficiaryModel } from './beneficiary.model';

@Injectable({
    providedIn: 'root'
})
export class BeneficiariesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getBeneficiariesByKey(key: string): Observable<BeneficiaryModel[]> {
        return this.httpService.get(`beneficiaries/byKey/${key}`)
    }

    getBeneficiariesByPage(pageIndex: number, pageSize: number): Observable<BeneficiaryModel[]> {
        return this.httpService.get(`beneficiaries/${pageIndex}/${pageSize}`)
    }

    getBeneficiariesCount(): Observable<number> {
        return this.httpService.get('beneficiaries/count')
    }

    getBeneficiaryById(beneficiaryId: string): Observable<BeneficiaryModel> {
        return this.httpService.get(`beneficiaries/${beneficiaryId}`)
    }

    create(beneficiary: BeneficiaryModel): Observable<BeneficiaryModel> {
        return this.httpService.post('beneficiaries', { beneficiary })
    }

    update(beneficiary: BeneficiaryModel, beneficiaryId: string): Observable<BeneficiaryModel> {
        return this.httpService.put(`beneficiaries/${beneficiaryId}`, { beneficiary })
    }

}
