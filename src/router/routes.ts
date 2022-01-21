import { RouteRecordRaw } from 'vue-router';
import { LayoutEnum, PageEnum, PageNameEnum } from '@/enums/PageEnum';
const routes: Array<RouteRecordRaw> = [
  {
    path: PageEnum.HOME,
    name: PageNameEnum.HOME,
    meta: { layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: PageEnum.LOGIN,
    name: PageNameEnum.LOGIN,
    meta: { public: true, layout: LayoutEnum.FILLED },
    component: () => import('@/views/login/SignIn.vue'),
  },
  {
    path: PageEnum.ERROR_PAGE,
    name: PageNameEnum.ERROR_PAGE,
    meta: { public: true, layout: LayoutEnum.FILLED },
    component: () => import('@/views/error/NotFound.vue'),
  },
];

export default routes;
