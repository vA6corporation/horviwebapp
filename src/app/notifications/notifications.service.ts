import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { NotificationModel } from './notification.model';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getNotificationsByPage(
        pageIndex: number,
        pageSize: number,
        params: Params
    ): Observable<NotificationModel[]> {
        return this.httpService.get(`notifications/byPage/${pageIndex}/${pageSize}`, params)
    }

    getCountNotifications(params: Params): Observable<number> {
        return this.httpService.get('notifications/countNotifications', params)
    }

}
