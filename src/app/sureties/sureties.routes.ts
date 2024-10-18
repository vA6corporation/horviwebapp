import { Routes } from '@angular/router';
import { SuretiesComponent } from './sureties/sureties.component';
import { CreateSuretiesComponent } from './create-sureties/create-sureties.component';
import { EditSuretiesComponent } from './edit-sureties/edit-sureties.component';
import { WithoutDocumentationSuretiesComponent } from './without-documentation-sureties/without-documentation-sureties.component';
import { SummarySuretiesComponent } from './summary-sureties/summary-sureties.component';

export const routes: Routes = [
    { path: '', component: SuretiesComponent },
    { path: 'create', component: CreateSuretiesComponent },
    { path: ':suretyId/edit', component: EditSuretiesComponent },
    { path: 'withoutDocumentation', component: WithoutDocumentationSuretiesComponent },
    { path: 'summarySureties', component: SummarySuretiesComponent }
];
