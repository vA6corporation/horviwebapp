import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { InsuranceNodeModel } from './insurance-node.model';
import { InsuranceModel } from './insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceById(insuranceId: string): Observable<InsuranceModel> {
        return this.httpService.get(`insurances/byId/${insuranceId}`)
    }

    getInsurancesByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/byPage/${pageIndex}/${pageSize}`, params)
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`)
    }

    getInsurancesByKey(key: string): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`)
    }

    getCountInsurances(params: Params): Observable<number> {
        return this.httpService.get('insurances/countInsurances', params)
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params)
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params)
    }

    getInsuranceNodes(
        fileType: string,
        insuranceId: string
    ): Observable<InsuranceNodeModel[]> {
        return this.httpService.get(`insuranceNodes/byInsurance/${fileType}/${insuranceId}`)
    }

    getFile(url: string) {
        return this.httpService.getFile(url)
    }

    uploadFile(formData: FormData, fileType: string, insuranceId: string): Observable<any> {
        return this.httpService.postFile(`insuranceNodes/upload/${fileType}/${insuranceId}`, formData)
    }

    deleteFile(insuranceNodeId: string): Observable<string> {
        return this.httpService.delete(`insuranceNodes/${insuranceNodeId}`)
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceModel> {
        return this.httpService.post('insurances', { insurance, insuranceGroupId })
    }

    update(
        insurance: any,
        insuranceId: string
    ): Observable<void> {
        return this.httpService.put(`insurances/${insuranceId}`, { insurance })
    }

    createWithInsuranceGroup(insurance: any): Observable<InsuranceModel> {
        return this.httpService.post('insurances', { insurance })
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId })
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`)
    }

    delete(insuranceId: string): Observable<void> {
        return this.httpService.delete(`insurances/${insuranceId}`)
    }

    getSummary(year: number, type: string, params: Params): Observable<any[]> {
        return this.httpService.get(`insurances/summaryByYearType/${year}/${type}`, params)
    }

    getSummaryByRangeDateTypeWorker(startDate: Date, endDate: Date, params: Params): Observable<any[]> {
        return this.httpService.get(`insurances/summaryByRangeDateTypeWorker/${startDate}/${endDate}`, params)
    }
    
}
