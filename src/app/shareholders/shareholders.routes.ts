import { Routes } from '@angular/router';
import { ShareholdersComponent } from './shareholders/shareholders.component';
import { CreateShareholdersComponent } from './create-shareholders/create-shareholders.component';
import { EditShareholdersComponent } from './edit-shareholders/edit-shareholders.component';

export const routes: Routes = [
    { path: '', component: ShareholdersComponent },
    { path: 'create', component: CreateShareholdersComponent },
    { path: ':shareholderId/edit', component: EditShareholdersComponent },
];
