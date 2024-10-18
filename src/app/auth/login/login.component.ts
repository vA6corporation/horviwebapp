import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { AuthService } from '../auth.service';

interface RememberUserModel {
    _id: string
    name: string
    email: string
    password: string
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly navigationService: NavigationService,
    ) { }

    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        rememberme: false,
    })
    isLoading: boolean = false
    newLogin: boolean = false
    rememberUsers: RememberUserModel[] = []
    hide: boolean = true
    private db: IDBDatabase | null = null
    private count = 0

    ngOnInit(): void {
        this.navigationService.setTitle('Fiderly')
        this.loadDb().then(() => {
            this.loadUsers()
        })
    }

    onDeploy() {
        if (this.count >= 5) {
            this.router.navigate(['signup'])
        }
        this.count += 1
    }

    loadDb(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (indexedDB) {
                const request = indexedDB.open('kramvi', 2)
                request.onsuccess = () => {
                    this.db = request.result
                    resolve()
                }

                request.onupgradeneeded = (e) => {
                    this.db = request.result
                    console.log('CREATE', this.db)
                    if (e.oldVersion < 1) {
                        this.db.createObjectStore('rememberUsers', { keyPath: '_id' })
                    }

                    if (e.oldVersion < 2) {
                        this.db.createObjectStore('printers', { keyPath: 'name' })
                    }
                }

                request.onerror = (error) => {
                    console.log('Error', error)
                    reject()
                }
            } else {
                reject()
            }
        })
    }

    updateUser(user: RememberUserModel) {
        const transaction = this.db?.transaction(['rememberUsers'], 'readwrite')
        const objectStore = transaction?.objectStore('rememberUsers')
        objectStore?.put(user)
    }

    onDeleteUser(userId: string, event: MouseEvent) {
        event.stopPropagation()
        const ok = confirm('Esta seguro de eliminar?...')
        if (ok && this.db !== null) {
            const transaction = this.db.transaction(['rememberUsers'], 'readwrite')
            const objectStore = transaction.objectStore('rememberUsers')
            const request = objectStore.delete(userId)
            request.onsuccess = () => {
                this.loadUsers()
            }
        }
    }

    getUser(userId: string): Promise<RememberUserModel> {
        return new Promise((resolve, reject) => {
            if (this.db !== null) {
                const transaction = this.db.transaction(['rememberUsers'], 'readonly')
                const objectStore = transaction.objectStore('rememberUsers')
                const request = objectStore.get(userId)

                request.onsuccess = () => {
                    resolve(request.result)
                }
            }
        })
    }

    loadUsers() {
        if (this.db !== null) {
            const transaction = this.db.transaction(['rememberUsers'], 'readonly')
            const objectStore = transaction.objectStore('rememberUsers')
            const request = objectStore.openCursor()
            const rememberUsers: RememberUserModel[] = []
            request.onsuccess = (e: any) => {
                const cursor = e.target.result
                if (cursor) {
                    rememberUsers.push(cursor.value)
                    cursor.continue()
                } else {
                    this.rememberUsers = rememberUsers
                }
            }
        }
    }

    onUserSelected(user: RememberUserModel) {
        this.loginForm.patchValue(user)
        this.onSubmit()
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true
            this.navigationService.loadBarStart()
            const { email, password, rememberme } = this.loginForm.value
            this.authService.login(email, password).subscribe({
                next: auth => {
                    this.navigationService.loadBarFinish()
                    const {
                        accessToken,
                        user,
                    } = auth
                    if (rememberme) {
                        const rememberUser: RememberUserModel = {
                            _id: user._id,
                            name: user.name,
                            email,
                            password,
                        }
                        this.updateUser(rememberUser)
                    }
                    this.isLoading = false
                    this.authService.setAccessToken(accessToken)
                    this.authService.setAuth(user)
                    this.authService.loggedIn()
                    this.router.navigate(['/'])
                }, error: (error: HttpErrorResponse) => {
                    console.log(error)
                    this.isLoading = false
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage('Usuario o contraseña incorrectos')
                }
            })
        }
    }
}
