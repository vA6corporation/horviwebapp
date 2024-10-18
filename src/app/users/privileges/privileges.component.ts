import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { UserModel } from '../../users/user.model';
import { ModuleModel } from '../module.model';
import { UsersService } from '../users.service';

@Component({
    selector: 'app-privileges',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, RouterModule],
    templateUrl: './privileges.component.html',
    styleUrls: ['./privileges.component.sass']
})
export class PrivilegesComponent implements OnInit {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly usersService: UsersService,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: FormGroup = this.formBuilder.group(this.authService.getObjectModules())
    modules: ModuleModel[] = []
    user: UserModel = new UserModel()
    isLoading: boolean = false

    private handleAuth$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleAuth$.unsubscribe()
    }

    ngOnInit(): void {
        this.modules = this.authService.getModules()
        this.usersService.getUserById(this.activatedRoute.snapshot.params['userId']).subscribe(user => {
            this.navigationService.setTitle(`Permisos ${user.name}`)
            this.user = user
            for (const module of this.modules) {
                if (user.privileges[module.name])
                    this.formGroup.get(module.name)?.setValue(true)
            }
        })
    }

    onSubmit() {
        this.user.privileges = this.formGroup.value
        this.isLoading = true
        this.navigationService.loadBarStart()
        this.usersService.update(this.user, this.user._id).subscribe(() => {
            this.isLoading = false
            this.navigationService.loadBarFinish()
            this.navigationService.showMessage('Se han guardado los cambios')
        })
    }

}
