import * as component from './components';

export const projectRoutes = [
  {
    path: '/project',
    name: 'ProjectList',
    component: component.ProjectList,
    meta: {
      layout: 'MainLayout',
      breadcrumbs: [
        {key: 'Homepage', label: 'Home', to: '/'},
        {key: 'Project', label: 'Project', to: '/project'},
      ],
    },
  },
];
