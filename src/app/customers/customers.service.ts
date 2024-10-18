import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { CustomerModel } from './customer.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getCustomerById(customerId: string): Observable<CustomerModel> {
        return this.httpService.get(`customers/byId/${customerId}`)
    }

    getCustomersByPage(
        pageIndex: number,
        pageSize: number,
    ): Observable<CustomerModel[]> {
        return this.httpService.get(`customers/byPage/${pageIndex}/${pageSize}`)
    }

    getCountCustomers(): Observable<number> {
        return this.httpService.get('customers/countCustomers')
    }

    getCustomersByKey(
        key: string,
    ): Observable<CustomerModel[]> {
        return this.httpService.get(`customers/byKey/${key}`)
    }

    create(customer: any): Observable<CustomerModel> {
        return this.httpService.post('customers', { customer })
    }

    update(customer: any, customerId: string): Observable<void> {
        return this.httpService.put(`customers/${customerId}`, { customer })
    }

}
