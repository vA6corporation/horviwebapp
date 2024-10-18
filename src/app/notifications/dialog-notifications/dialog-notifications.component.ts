import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationModel } from '../notification.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog-notifications',
    standalone: true,
    imports: [MaterialModule, CommonModule],
    templateUrl: './dialog-notifications.component.html',
    styleUrl: './dialog-notifications.component.sass'
})
export class DialogNotificationsComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly notifications: NotificationModel[]
    ) { }

}
