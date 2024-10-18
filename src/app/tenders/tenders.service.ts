import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TenderModel } from './tender.model';
import { HttpService } from '../http.service';
import { TenderNodeModel } from './tender-node.model';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TendersService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getTenderById(
        tenderId: string,
    ): Observable<TenderModel> {
        return this.httpService.get(`tenders/byId/${tenderId}`)
    }

    getTendersByPage(
        pageIndex: number,
        pageSize: number,
        params: Params
    ): Observable<TenderModel[]> {
        return this.httpService.get(`tenders/byPage/${pageIndex}/${pageSize}`, params)
    }

    getCountTenders(): Observable<number> {
        return this.httpService.get(`tenders/countTenders`)
    }

    getTendersByPageKey(
        pageIndex: number,
        pageSize: number,
        key: string
    ): Observable<TenderModel[]> {
        return this.httpService.get(`tenders/byPageKey/${pageIndex}/${pageSize}/${key}`)
    }

    getTendersWithoutDocumentation(
        params: Params
    ): Observable<TenderModel[]> {
        return this.httpService.get('tenders/withoutDocumentation', params)
    }

    getTenderNodes(
        fileType: string,
        insuranceId: string
    ): Observable<TenderNodeModel[]> {
        return this.httpService.get(`tenderNodes/byTender/${fileType}/${insuranceId}`)
    }

    getFile(url: string) {
        return this.httpService.getFile(url)
    }

    uploadFile(formData: FormData, fileType: string, tenderId: string): Observable<any> {
        return this.httpService.postFile(`tenderNodes/upload/${fileType}/${tenderId}`, formData)
    }

    deleteFile(insuranceNodeId: string): Observable<string> {
        return this.httpService.delete(`tenderNodes/${insuranceNodeId}`)
    }

    create(
        tender: any,
    ): Observable<TenderModel> {
        return this.httpService.post('tenders', { tender })
    }

    update(
        tender: any,
        tenderId: string
    ): Observable<void> {
        return this.httpService.put(`tenders/${tenderId}`, { tender })
    }

}
