import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { SuretyModel } from './surety.model';
import { Params } from '@angular/router';
import { SuretyNodeModel } from './surety-node.model';

@Injectable({
    providedIn: 'root'
})
export class SuretiesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getSuretiesByKey(key: string): Observable<SuretyModel[]> {
        return this.httpService.get(`sureties/byKey/${key}`)
    }

    getCountSureties(params: Params): Observable<number> {
        return this.httpService.get('sureties/countSureties', params)
    }

    getSuretiesByPage(
        pageIndex: number, 
        pageSize: number,
        params: Params
    ): Observable<SuretyModel[]> {
        return this.httpService.get(`sureties/byPage/${pageIndex}/${pageSize}`, params)
    }

    getSuretiesWithoutDocumentation(
        params: Params
    ): Observable<SuretyModel[]> {
        return this.httpService.get('sureties/withoutDocumentation', params)
    }

    getSuretiesByTender(tenderId: string): Observable<SuretyModel[]> {
        return this.httpService.get(`sureties/byTender/${tenderId}`)
    }

    getSuretyById(suretyId: string): Observable<SuretyModel> {
        return this.httpService.get(`sureties/byId/${suretyId}`)
    }

    getSummarySureties(
        params: Params
    ): Observable<any> {
        return this.httpService.get('sureties/summarySureties', params)
    }

    delete(suretyId: string): Observable<any> {
        return this.httpService.delete(`sureties/${suretyId}`)
    }

    getSuretyNodes(
        fileType: string,
        suretyId: string
    ): Observable<SuretyNodeModel[]> {
        return this.httpService.get(`suretyNodes/bySurety/${fileType}/${suretyId}`)
    }

    getFile(url: string) {
        return this.httpService.getFile(url)
    }

    uploadFile(formData: FormData, fileType: string, suretyId: string): Observable<any> {
        return this.httpService.postFile(`suretyNodes/upload/${fileType}/${suretyId}`, formData)
    }

    deleteFile(suretyNodeId: string): Observable<string> {
        return this.httpService.delete(`suretyNodes/${suretyNodeId}`)
    }

    create(
        surety: any,
        cheques: any[],
        deposits: any[],
    ): Observable<SuretyModel> {
        return this.httpService.post('sureties', { surety, cheques, deposits })
    }

    update(
        surety: any,
        suretyId: string
    ): Observable<SuretyModel> {
        return this.httpService.put(`sureties/${suretyId}`, { surety })
    }

}
