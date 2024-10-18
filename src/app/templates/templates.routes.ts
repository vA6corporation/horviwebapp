import { Routes } from '@angular/router';
import { TemplatesComponent } from './templates/templates.component';
import { CreateTemplatesComponent } from './create-templates/create-templates.component';
import { EditTemplatesComponent } from './edit-templates/edit-templates.component';

export const routes: Routes = [
    { path: '', component: TemplatesComponent },
    { path: 'create', component: CreateTemplatesComponent },
    { path: ':templateId/edit', component: EditTemplatesComponent },
];
