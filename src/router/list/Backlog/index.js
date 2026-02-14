import * as component from './components';

export const backlogRoutes = [
  {
    path: '/backlog',
    name: 'BacklogList',
    component: component.BacklogList,
    meta: {
      layout: 'MainLayout',
      breadcrumbs: [
        {key: 'Homepage', label: 'Home', to: '/'},
        {key: 'Backlog', label: 'Backlog', to: '/backlog'},
      ],
    },
  },
];
