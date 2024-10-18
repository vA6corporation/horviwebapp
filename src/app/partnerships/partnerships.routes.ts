import { Routes } from '@angular/router';
import { CreatePartnershipsComponent } from './create-partnerships/create-partnerships.component';
import { EditPartnershipsComponent } from './edit-partnerships/edit-partnerships.component';
import { PartnershipsComponent } from './partnerships/partnerships.component';

export const routes: Routes = [
    { path: '', component: PartnershipsComponent },
    { path: 'create', component: CreatePartnershipsComponent },
    { path: ':partnershipId/edit', component: EditPartnershipsComponent },
];
