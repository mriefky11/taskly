import * as component from './components';
import {taskRoutes} from './Task';
import {settingsRoutes} from './Settings';
import {projectRoutes} from './Project';
import {kanbadRoutes} from './Kanbad';

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
  ...projectRoutes,
  ...kanbadRoutes,
];
