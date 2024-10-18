import { Routes } from "@angular/router";
import { TendersComponent } from "./tenders/tenders.component";
import { CreateTendersComponent } from "./create-tenders/create-tenders.component";
import { EditTendersComponent } from "./edit-tenders/edit-tenders.component";
import { WithoutDocumentationTendersComponent } from "./without-documentation-tenders/without-documentation-tenders.component";

export const routes: Routes = [
    { path: '', component: TendersComponent },
    { path: 'create', component: CreateTendersComponent },
    { path: ':tenderId/edit', component: EditTendersComponent },
    { path: 'withoutDocumentation', component: WithoutDocumentationTendersComponent }
]