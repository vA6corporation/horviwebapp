import { Routes } from "@angular/router";
import { BusinessesComponent } from "./businesses/businesses.component";
import { CreateBusinessesComponent } from "./create-businesses/create-businesses.component";
import { EditBusinessesComponent } from "./edit-businesses/edit-businesses.component";

export const routes: Routes = [
    { path: '', component: BusinessesComponent },
    { path: 'create', component: CreateBusinessesComponent },
    { path: ':businessId/edit', component: EditBusinessesComponent }
]