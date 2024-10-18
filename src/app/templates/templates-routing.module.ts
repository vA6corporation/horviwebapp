import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTemplatesComponent } from './create-templates/create-templates.component';
import { EditTemplatesComponent } from './edit-templates/edit-templates.component';
import { TemplatesComponent } from './templates/templates.component';

const routes: Routes = [
  { path: '', component: TemplatesComponent },
  { path: 'create', component: CreateTemplatesComponent },
  { path: ':templateId/edit', component: EditTemplatesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
