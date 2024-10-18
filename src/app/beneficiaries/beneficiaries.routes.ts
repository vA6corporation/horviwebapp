import { Routes } from '@angular/router';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { CreateBeneficiariesComponent } from './create-beneficiaries/create-beneficiaries.component';
import { EditBeneficiariesComponent } from './edit-beneficiaries/edit-beneficiaries.component';

export const routes: Routes = [
    { path: '', component: BeneficiariesComponent },
    { path: 'create', component: CreateBeneficiariesComponent },
    { path: ':beneficiaryId/edit', component: EditBeneficiariesComponent },
]
