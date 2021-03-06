import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'tasks', loadChildren: () => System.import('./tasks/tasks.module') },
      { path: 'profile', loadChildren: () => System.import('./profile/profile.module')}
      // { path: 'newtask', loadChildren: () => System.import('./')}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
