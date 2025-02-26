import { Routes } from '@angular/router';
import { PresentationEditComponent } from './presentation-edit/presentation-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'edit', pathMatch: 'full' },
    { path: 'edit', component: PresentationEditComponent },
];
