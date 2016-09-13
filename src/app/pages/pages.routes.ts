import { RouterConfig } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';
import { Charts } from './charts/charts.component';
import { ChartistJs } from './charts/components/chartistJs/chartistJs.component';
import { Pages } from './pages.component';
import { Ui } from './ui/ui.component';
import { Typography } from './ui/components/typography/typography.component';
import { Buttons } from './ui/components/buttons/buttons.component';
import { Icons } from './ui/components/incons/icons.component';
import { Grid } from './ui/components/grid/grid.component';
import { Forms } from './forms/forms.component';
import { Inputs } from './forms/components/inputs/inputs.component';
import { Layouts } from './forms/components/layouts/layouts.component';
import { BasicTables } from './tables/components/basicTables/basicTables.component';
import { Tables } from './tables/tables.component';
import { Maps } from './maps/maps.component';
import { GoogleMaps } from './maps/components/googleMaps/googleMaps.component';
import { LeafletMaps } from './maps/components/leafletMaps/leafletMaps.component';
import { BubbleMaps } from './maps/components/bubbleMaps/bubbleMaps.component';
import { LineMaps } from './maps/components/lineMaps/lineMaps.component';
import { Editors } from './editors/editors.component';
import { Ckeditor } from './editors/components/ckeditor/ckeditor.component';
import { Components } from './components/components.component';
import { TreeView } from './components/components/treeView/treeView.component';


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














