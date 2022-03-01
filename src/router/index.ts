import { createRouter, createWebHistory, RouterScrollBehavior } from 'vue-router';
import routes from './routes';
import { setupNavigationGuarder } from './interceptor';

// 페이지 이동시 스크롤 초기화
const scrollBehavior: RouterScrollBehavior = () => {
  return {
    left: 0,
    top: 0,
  };
};
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: scrollBehavior,
});

setupNavigationGuarder(router);
export default router;
