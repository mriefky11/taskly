import * as component from './components';

export const settingsRoutes = [
  {
    path: '/settings',
    name: 'Settings',
    component: component.Settings,
    meta: {
      layout: 'MainLayout',
      breadcrumbs: [
        {key: 'Homepage', label: 'Home', to: '/'},
        {key: 'Settings', label: 'Settings', to: '/settings'},
      ],
    },
  },
];
