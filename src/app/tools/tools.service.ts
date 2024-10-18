import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class ToolsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    exonerateProducts() {
        return this.httpService.get('tools/exonerateProducts')
    }

    updateStock(businessId: string) {
        return this.httpService.get(`tools/updateStock/${businessId}`)
    }

    importBusineses(businesses: any[]): Observable<void> {
        return this.httpService.post('tools/importBusinesses', { businesses })
    }

}
