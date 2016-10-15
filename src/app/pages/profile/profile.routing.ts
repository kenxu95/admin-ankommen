import { Routes, RouterModule } from '@angular/router';

import { Profile } from './profile.component';
import { ViewProfile } from './components/viewProfile';
import { EditAssets } from './components/editAssets';

const routes: Routes = [
  {
    path: '',
    component: Profile,
    children: [
      { path: 'view', component: ViewProfile },
      { path: 'editassets', component: EditAssets }
    ]
  }
];

export const routing = RouterModule.forChild(routes);