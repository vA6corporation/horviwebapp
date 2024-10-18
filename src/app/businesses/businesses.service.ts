import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { BusinessModel } from './business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessesService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getBusinessById(businessId: string): Observable<BusinessModel> {
        return this.httpService.get(`businesses/byId/${businessId}`)
    }

    getBusinessesByKey(key: string): Observable<BusinessModel[]> {
        return this.httpService.get(`businesses/bykey/${key}`)
    }

    getBusinessesByPage(
        pageIndex: number,
        pageSize: number,
    ): Observable<BusinessModel[]> {
        return this.httpService.get(`businesses/byPage/${pageIndex}/${pageSize}`)
    }

    getCountBusinesses(): Observable<number> {
        return this.httpService.get('businesses/countBusinesses')
    }

    create(
        business: any,
        experiences: any[],
    ): Observable<BusinessModel> {
        return this.httpService.post('businesses', { business, experiences })
    }

    update(
        business: any, 
        experiences: any[], 
        businessId: string
    ): Observable<void> {
        return this.httpService.put(`businesses/${businessId}`, { business, experiences })
    }
    
}
