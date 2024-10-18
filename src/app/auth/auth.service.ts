import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { ModuleModel } from '../users/module.model';
import { UserModel } from '../users/user.model';
import { AuthModel } from './auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    private auth: AuthModel | null = null
    private isAuth$: Subject<boolean> = new Subject()
    private modules$ = new BehaviorSubject<ModuleModel[]>([])
    private auth$ = new BehaviorSubject<AuthModel>({
        user: new UserModel(),
    })

    private modules: ModuleModel[] = [
        { label: 'Seace', name: 'seaces', path: '/seaces', icon: 'travel_explorer', isActive: false },
        { label: 'Notificaciones', name: 'notifications', path: '/notifications', icon: 'notifications', isActive: false },
        { label: 'Obras', name: 'tenders', path: '/tenders', icon: 'construction', isActive: false },
        { label: 'Fianzas', name: 'sureties', path: '/sureties', icon: 'construction', isActive: false },
        { label: 'Consorcios', name: 'partnerships', path: '/partnerships', icon: 'group', isActive: false },
        { label: 'Empresas', name: 'businesses', path: '/businesses', icon: 'group', isActive: false },
        { label: 'Beneficiarios', name: 'beneficiaries', path: '/beneficiaries', icon: 'group', isActive: false },
        { label: 'Financieras', name: 'financiers', path: '/financiers', icon: 'group', isActive: false },
        { label: 'Usuarios', name: 'users', path: '/users', icon: 'account_box', isActive: false },
        { label: 'Comerciales', name: 'commercials', path: '/commercials', icon: 'account_box', isActive: false },
        { label: 'Clientes', name: 'customers', path: '/customers', icon: 'group', isActive: false },
        { label: 'Seguros', name: 'insurances', path: '/insurances', icon: 'health_and_safety', isActive: false },
        { label: 'Formatos', name: 'templates', path: '/templates', icon: 'description', isActive: false },
        { label: 'Reportes', name: 'reports', path: '/reports', icon: 'description', isActive: false },
        { label: 'Contabilidad', name: 'accounting', path: '/accounting', icon: 'local_atm', isActive: false },
    ]

    private objectModules = {
        seaces: false,
        notifications: false,
        sureties: false,
        tenders: false,
        businesses: false,
        beneficiaries: false,
        partnerships: false,
        financiers: false,
        insurances: false,
        customers: false,
        templates: false,
        users: false,
        commercials: false,
        reports: false,
        accounting: false,
    }

    getObjectModules() {
        return this.objectModules
    }

    getModules() {
        return this.modules
    }

    handleAuth() {
        return this.auth$.asObservable()
    }

    handleModules() {
        return this.modules$.asObservable()
    }

    setAuth(
        user: UserModel,
    ): void {
        for (const module of this.modules) {
            if (user.privileges[module.name]) {
                module.isActive = true
            }
            if (user.isAdmin) {
                module.isActive = true
            }
        }
        this.auth = {
            user,
        }
        this.auth$.next(this.auth)
        this.modules$.next(this.modules)
    }

    setUser(user: UserModel) {
        if (this.auth) {
            this.auth.user = user
        }
    }

    getAuth(): AuthModel | null {
        return this.auth
    }

    handleIsAuth() {
        return this.isAuth$.asObservable()
    }

    loggedIn() {
        this.isAuth$.next(true)
    }

    loggedOut() {
        this.isAuth$.next(false)
    }

    setAccessToken(accessToken: string | null): void {
        this.httpService.accessToken = accessToken
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
        } else {
            localStorage.setItem('accessToken', '')
        }
    }

    login(email: string, password: string): Observable<any> {
        return this.httpService.post('auth/login', { email, password })
    }

    signup(business: any, office: any, user: any): Observable<any> {
        return this.httpService.post('signup', { business, office, user })
    }

    logout(): void {
        this.setAccessToken(null)
        location.reload()
    }

    getSession(): Observable<any> {
        return this.httpService.get('auth/profile')
    }

}
