import * as component from './components';

export const kanbadRoutes = [
  {
    path: '/kanban',
    name: 'KanbanBoard',
    component: component.KanbanBoard,
    meta: {
      layout: 'MainLayout',
      breadcrumbs: [
        {key: 'Homepage', label: 'Home', to: '/'},
        {key: 'Kanban', label: 'Kanban', to: '/kanban'},
      ],
    },
  },
];
