import { Routes } from "@angular/router";
import { CommercialsComponent } from "./commercials/commercials.component";
import { CreateCommercialsComponent } from "./create-commercials/create-commercials.component";
import { EditCommercialsComponent } from "./edit-commercials/edit-commercials.component";

export const routes: Routes = [
    { path: '', component: CommercialsComponent },
    { path: 'create', component: CreateCommercialsComponent },
    { path: ':commercialId/edit', component: EditCommercialsComponent }
]