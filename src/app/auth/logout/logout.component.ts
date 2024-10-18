import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NavigationService } from '../../navigation/navigation.service';
import { UserModel } from '../../users/user.model';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [MaterialModule, CommonModule],
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
    ) { }

    user: UserModel = new UserModel()

    private handleAuth$: Subscription = new Subscription()
    private handleBusinesses$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleAuth$.unsubscribe()
        this.handleBusinesses$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Cerrar sesion')

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user
        })
    }

    onLogout() {
        this.authService.logout()
    }

}
