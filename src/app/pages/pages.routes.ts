import { RouterConfig } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';
import { Pages } from './pages.component';

import { ActiveTasks } from './tasks/components/activeTasks/activeTasks.component';
import { PotentialTasks } from './tasks/components/potentialTasks/potentialTasks.component';
import { PreviousTasks } from './tasks/components/previousTasks/previousTasks.component';
import { Profile } from './profile/profile.component';
import { EditAssets } from './profile/components/editAssets/editAssets.component';
import { NewTask } from './tasks/components/newTask/newTask.component';

import { CanActivateViaAuthGuard } from '../shared/auth-guard';

//noinspection TypeScriptValidateTypes
export const PagesRoutes:RouterConfig = [  
{
  path: 'pages',
  component: Pages,
  canActivate: [CanActivateViaAuthGuard],
  children: [
  {
    path: 'dashboard',
    component: Dashboard,
    data: {
      menu: {
        title: 'Dashboard',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 0
      }
    }
  },
  {
    path: 'tasks',
    data: {
      menu: {
        title: 'View Tasks',
        icon: 'ion-grid'
      }
    },
    children: [
    {
      path: 'active',
      component: ActiveTasks,
      data: {
        menu: {
          title: 'Active Tasks'
        }
      }
    },
    {
      path: 'potential',
      component: PotentialTasks,
      data: {
        menu: {
          title: 'Potential Tasks'
        }
      }
    },
    {
      path: 'previous',
      component: PreviousTasks,
      data: {
        menu: {
          title: 'Previous Tasks'
        }
      }
    }
    ]
  },
  {
    path: 'newtask',
    component: NewTask,
    data: {
      menu: {
        title: 'Create Task',
        icon: 'ion-edit'
      }
    }
  },


  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'editassets',
    component: EditAssets
  }
  ]}];














