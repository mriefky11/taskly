import {createRouter, createWebHistory} from 'vue-router';
import {routes} from './list';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // contoh guard berbasis localStorage task
  if (to.meta.requiresTasks) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    if (!tasks.length) {
      return next('/');
    }
  }

  next();
});

export default router;
