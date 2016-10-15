import { Routes, RouterModule } from '@angular/router';

import { Tasks } from './tasks.component';
import { ActiveTasks } from './components/display/activeTasks';
import { PotentialTasks } from './components/display/potentialTasks';
import { PreviousTasks } from './components/display/previousTasks';
import { NewTask } from './components/display/newTask';

const routes: Routes = [
  {
    path: '',
    component: Tasks,
    children: [
      { path: 'active', component: ActiveTasks },
      { path: 'potential', component: PotentialTasks },
      { path: 'previous', component: PreviousTasks },
      { path: 'newtask', component: NewTask }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
