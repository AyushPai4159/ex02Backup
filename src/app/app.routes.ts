import { Routes } from '@angular/router';
import { ShareComponent } from './share/share.component';
import { ShowAllComponent } from './showAll/show-all/show-all.component';

export const routes: Routes = [
  { path: '', component: ShareComponent },
  { path: 'all', component: ShowAllComponent },
];
