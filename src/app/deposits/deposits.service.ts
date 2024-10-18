import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class DepositsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    create(deposit: any) {
        return this.httpService.post('deposits', { deposit })
    }

    delete(depositId: any) {
        return this.httpService.delete(`deposits/${depositId}`)
    }

}
