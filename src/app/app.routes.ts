import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', loadChildren: () => import('./auth/auth.routes').then(m => m.routes) },
    { path: 'seaces', loadChildren: () => import('./seaces/seaces.routes').then(m => m.routes) },
    { path: 'notifications', loadChildren: () => import('./notifications/notifications.routes').then(m => m.routes) },
    { path: 'tenders', loadChildren: () => import('./tenders/tenders.routes').then(m => m.routes) },
    { path: 'sureties', loadChildren: () => import('./sureties/sureties.routes').then(m => m.routes) },
    { path: 'businesses', loadChildren: () => import('./businesses/businesses.routes').then(m => m.routes) },
    { path: 'beneficiaries', loadChildren: () => import('./beneficiaries/beneficiaries.routes').then(m => m.routes) },
    { path: 'partnerships', loadChildren: () => import('./partnerships/partnerships.routes').then(m => m.routes) },
    { path: 'financiers', loadChildren: () => import('./financiers/financiers.routes').then(m => m.routes) },
    { path: 'insurances', loadChildren: () => import('./insurances/insurances.routes').then(m => m.routes) },
    { path: 'customers', loadChildren: () => import('./customers/customers.routes').then(m => m.routes) },
    { path: 'templates', loadChildren: () => import('./templates/templates.routes').then(m => m.routes) },
    { path: 'cheques', loadChildren: () => import('./cheques/cheques.routes').then(m => m.routes) },
    { path: 'shareholders', loadChildren: () => import('./shareholders/shareholders.routes').then(m => m.routes) },
    { path: 'users', loadChildren: () => import('./users/users.routes').then(m => m.routes) },
    { path: 'commercials', loadChildren: () => import('./commercials/commercials.routes').then(m => m.routes) },
    { path: 'settings', loadChildren: () => import('./settings/settings.routes').then(m => m.routes) },
    { path: 'tools', loadChildren: () => import('./tools/tools.routes').then(m => m.routes) },
    { path: 'payments', loadChildren: () => import('./payments/payments.routes').then(m => m.routes) },
    { path: 'paymentOrders', loadChildren: () => import('./payment-orders/payment-orders.routes').then(m => m.routes) },
    { path: 'providers', loadChildren: () => import('./providers/providers.routes').then(m => m.routes) },
    { path: 'banks', loadChildren: () => import('./banks/banks.routes').then(m => m.routes) },
];
