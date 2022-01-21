import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import {setupNavigationGuarder} from './interceptor';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
setupNavigationGuarder(router);
export default router;
