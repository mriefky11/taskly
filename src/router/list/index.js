import * as component from './components';
import {taskRoutes} from './Task';
import {settingsRoutes} from './Settings';

export const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: component.Homepage,
    meta: {
      layout: 'MainLayout',
      breadcrumbs: [{key: 'Homepage', label: 'Home', to: '/'}],
    },
  },

  ...taskRoutes,
  ...settingsRoutes,
];
