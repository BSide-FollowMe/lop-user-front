import { RouteRecordRaw } from 'vue-router';
import { LayoutEnum, PageEnum, PageNameEnum } from '@/enums/PageEnum';
const routes: Array<RouteRecordRaw> = [
  {
    path: PageEnum.LANDING,
    name: PageNameEnum.LANDING,
    meta: { public: true, layout: LayoutEnum.FILLED },
    component: () => import('@/views/Landing.vue'),
  },
  {
    path: PageEnum.HOME,
    name: PageNameEnum.HOME,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: PageEnum.PLANT_DETAILS,
    name: PageNameEnum.PLANT_DETAILS,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/PlantDetail.vue'),
  },
  {
    path: PageEnum.LOGIN,
    name: PageNameEnum.LOGIN,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/login/SignIn.vue'),
  },
  {
    path: PageEnum.OAUTH_LANDING,
    name: PageNameEnum.OAUTH_LANDING,
    meta: { public: true, layout: LayoutEnum.FILLED },
    component: () => import('@/views/login/OAuthLanding.vue'),
  },
  {
    path: PageEnum.SEARCH_RESULT,
    name: PageNameEnum.SEARCH_RESULT,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/search/index.vue'),
  },
  {
    path: PageEnum.QNABOARD,
    name: PageNameEnum.QNABOARD,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/qna/index.vue'),
  },
  {
    path: '/modal-test',
    name: 'Modal Test',
    meta: { public: true, layout: LayoutEnum.FILLED },
    component: () => import('@/views/debug/ModalTest.vue'),
  },
  {
    path: PageEnum.ERROR_PAGE,
    name: PageNameEnum.ERROR_PAGE,
    meta: { public: true, layout: LayoutEnum.FILLED },
    component: () => import('@/views/error/NotFound.vue'),
  },
];

export default routes;
