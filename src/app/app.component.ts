import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NavigationService } from './navigation/navigation.service';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { NotificationsService } from './notifications/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogNotificationsComponent } from './notifications/dialog-notifications/dialog-notifications.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatSidenavModule, ToolbarComponent, SidenavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {

    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    title = 'Fiderly'
    isStart: boolean = false
    isAuth: boolean = false
    currentPath: string = ''
    sidenavMode: MatDrawerMode = 'over'

    private mainScreens = [
        '/',
        '/seaces',
        '/notifications',
        '/tenders',
        '/sureties',
        '/businesses',
        '/financiers',
        '/partnerships',
        '/users',
        '/commercials',
        '/customers',
        '/insurances',
        '/templates',
        '/shareholders',
        '/settings',
        '/logout',
        '/login',
        '/cheques',
        '/tenders/withoutDocumentation',
        '/sureties/summarySureties',
        '/payments',
        '/paymentOrders',
        '/providers',
        '/banks',
    ]

    ngOnInit(): void {
        if (window.innerWidth > 1366) {
            this.sidenavMode = 'side'
        }
        
        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get('accessToken') || localStorage.getItem('accessToken')

        this.authService.handleIsAuth().subscribe(isAuth => {
            this.isAuth = isAuth
            if (this.isAuth) {
                this.authService.handleAuth().subscribe(auth => {
                    if (auth.user.commercialId) {
                        this.notificationsService.getNotificationsByPage(1, 15, { commercialId: auth.user.commercialId })
                            .subscribe(notifications => {
                                if (notifications.length) {
                                    this.matDialog.open(DialogNotificationsComponent, {
                                        width: '600px',
                                        position: { top: '20px' },
                                        data: notifications
                                    })
                                }
                            })
                    }
                })
            }
        })

        const $events = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                $events.unsubscribe()
                const queryParams = this.activatedRoute.snapshot.queryParams
                if (queryParams['email'] && queryParams['password']) {
                    this.isStart = true
                    this.authService.login(queryParams['email'], queryParams['password']).subscribe({
                        next: auth => {
                            const {
                                accessToken,
                                user,
                            } = auth
                            this.authService.setAccessToken(accessToken)
                            this.authService.setAuth(user)
                            this.router.navigate(['/'])
                        }, error: (error: HttpErrorResponse) => {
                            this.isStart = true
                        }
                    })
                } else {
                    this.authService.setAccessToken(accessToken)
                    this.authService.getSession().subscribe({
                        next: auth => {
                            const { user, activeModules } = auth
                            this.authService.setAuth(user)
                            this.navigationService.loadBarFinish()
                            this.isStart = true
                            this.authService.loggedIn()
                        }, error: () => {
                            this.router.navigate(['/login'])
                            this.navigationService.loadBarFinish()
                            this.isStart = true
                        }
                    })
                }
            }
        })

        this.router.events.forEach(event => {
            if (event instanceof NavigationEnd) {
                if (this.currentPath !== this.router.url.split('?')[0]) {
                    this.navigationService.setMenu([])
                    if (this.mainScreens.includes(this.router.url.split('?')[0])) {
                        this.navigationService.setIsMainScreen(true)
                    } else {
                        this.navigationService.setIsMainScreen(false)
                    }
                }
                this.currentPath = this.router.url.split('?')[0]
            }
        })
    }

}
