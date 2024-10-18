import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MaterialModule } from '../../material.module';
import { ModuleModel } from '../../users/module.model';
import { UserModel } from '../../users/user.model';
import { InsuranceType } from '../../insurances/insurance-type.enum';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [MaterialModule, RouterModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.sass'
})
export class SidenavComponent {

    constructor(
        private readonly authService: AuthService,
    ) { }

    modules: ModuleModel[] = []
    user: UserModel = new UserModel()
    isAuth: boolean = false
    insuranceType = InsuranceType

    private handleAuth$: Subscription = new Subscription()
    private handleModule$: Subscription = new Subscription()
    private handleIsAuth$: Subscription = new Subscription()

    ngOnDestroy(): void {
        this.handleAuth$.unsubscribe()
        this.handleModule$.unsubscribe()
        this.handleIsAuth$.unsubscribe()
    }

    ngOnInit(): void {
        this.handleIsAuth$ = this.authService.handleIsAuth().subscribe(isAuth => {
            this.isAuth = isAuth
        })

        this.handleModule$ = this.authService.handleModules().subscribe(modules => {
            this.modules = modules
        })

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user
        })
    }

    // onLogout(): void {
    //     this.authService.logout()
    //     this.sidenavClose.emit()
    // }

}
