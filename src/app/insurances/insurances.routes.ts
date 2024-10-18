import { Routes } from "@angular/router";
import { InsurancesComponent } from "./insurances/insurances.component";
import { CreateInsurancesComponent } from "./create-insurances/create-insurances.component";
import { EditInsurancesComponent } from "./edit-insurances/edit-insurances.component";

export const routes: Routes = [
    { path: '', component: InsurancesComponent },
    { path: 'create', component: CreateInsurancesComponent },
    { path: ':insuranceId/edit', component: EditInsurancesComponent }
]