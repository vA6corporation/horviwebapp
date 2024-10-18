import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomersComponent } from './create-customers/create-customers.component';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';

export const routes: Routes = [
    { path: '', component: CustomersComponent },
    { path: 'create', component: CreateCustomersComponent },
    { path: ':customerId/edit', component: EditCustomersComponent },
];
