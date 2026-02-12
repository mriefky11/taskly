import * as component from '../components';

export const taskRoutes = [
  {
    path: '/tasks',
    name: 'TaskList',
    component: component.TaskList,
    meta: {
      layout: 'MainLayout',
      breadcrumbs: [
        {key: 'Homepage', label: 'Home', to: '/'},
        {key: 'Tasks', label: 'Tasks', to: '/tasks'},
      ],
    },
  },
];
