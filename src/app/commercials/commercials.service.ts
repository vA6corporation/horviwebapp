import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { CommercialModel } from './commercial.model';

@Injectable({
  providedIn: 'root'
})
export class CommercialsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    private commercials$: BehaviorSubject<CommercialModel[]> | null = null

    getDisabledCommercials(): Observable<CommercialModel[]> {
        return this.httpService.get('commercials/disabled')
    }

    handleCommercials(): Observable<CommercialModel[]> {
        if (this.commercials$ === null) {
            this.commercials$ = new BehaviorSubject<CommercialModel[]>([])
            this.loadCommercials()
        }
        return this.commercials$.asObservable()
    }

    getCommercialsByPage(pageIndex: number, pageSize: number): Observable<CommercialModel[]> {
        return this.httpService.get(`commercials/byPage/${pageIndex}/${pageSize}`)
    }

    getCommercialsByKey(key: string): Observable<CommercialModel[]> {
        return this.httpService.get(`commercials/byKey/${key}`)
    }

    loadCommercials() {
        this.httpService.get('commercials').subscribe(commercials => {
            if (this.commercials$) {
                this.commercials$.next(commercials)
            }
        })
    }

    getCountCommercials(): Observable<number> {
        return this.httpService.get(`commercials/countCommercials`)
    }

    getCommercialById(commercialId: string): Observable<CommercialModel> {
        return this.httpService.get(`commercials/byId/${commercialId}`)
    }

    create(commercial: CommercialModel): Observable<CommercialModel> {
        return this.httpService.post('commercials', { commercial })
    }

    update(commercial: CommercialModel, commercialId: string): Observable<void> {
        return this.httpService.put(`commercials/${commercialId}`, { commercial })
    }

    delete(commercialId: string): Observable<void> {
        return this.httpService.delete(`commercials/${commercialId}`)
    }

    restore(commercialId: string): Observable<void> {
        return this.httpService.delete(`commercials/restore/${commercialId}`)
    }
}
