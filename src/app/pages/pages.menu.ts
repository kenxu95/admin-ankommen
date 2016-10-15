export const PAGES_MENU = [
{
  path: 'login'
},
{
  path: 'register'
},
{
  path: 'pages',
  children: [
  {
    path: 'dashboard',
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
      data: {
        menu: {
          title: 'Active Tasks'
        }
      }
    },
    {
      path: 'potential',
      data: {
        menu: {
          title: 'Potential Tasks'
        }
      }
    },
    {
      path: 'previous',
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
    data: {
      menu: {
        title: 'Create Task',
        icon: 'ion-edit'
      }
    }
  },
  {
    path: 'profile',
    children: [
    {
      path: 'editAssets'
    }
    ]
  },
  {
    path: 'task/:id',
  }
  ]
}
];
