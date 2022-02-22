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
    path: PageEnum.My_Page,
    meta: { public: true, layout: LayoutEnum.DEFAULT, backgroundColor: '#F8F8F8' },
    component: () => import('@/views/my-page/Index.vue'),
    children: [
      {
        path: '',
        meta: { public: true },
        name: PageNameEnum.My_Page,
        component: () => import('@/views/my-page/MyPage/Index.vue'),
      },
      {
        path: 'setting',
        meta: { public: true },
        name: PageNameEnum.SETTING,
        component: () => import('@/views/my-page/Setting/Index.vue'),
      },
      {
        path: 'my-plant',
        meta: { public: true },
        name: PageNameEnum.My_Plant,
        component: () => import('@/views/my-page/MyPlant/Index.vue'),
      },
    ],
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
    path: PageEnum.LOGOUT,
    name: PageNameEnum.LOGOUT,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/login/Logout.vue'),
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
    path: PageEnum.QNABOARD_DETAIL,
    name: PageNameEnum.QNABOARD_DETAIL,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/qna/QnaDetail/index.vue'),
  },
  {
    path: PageEnum.QNABOARD_EDIT,
    name: PageNameEnum.QNABOARD_EDIT,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/qna/QnaEdit/index.vue'),
  },
  {
    path: PageEnum.WATER_GUIDE,
    name: PageNameEnum.WATER_GUIDE,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/guide/WaterGuide/Index.vue'),
  },
  {
    path: PageEnum.VENTILATION_GUIDE,
    name: PageNameEnum.VENTILATION_GUIDE,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/guide/VentilationGuide/Index.vue'),
  },
  {
    path: PageEnum.SUNLIGHT_GUIDE,
    name: PageNameEnum.SUNLIGHT_GUIDE,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/guide/SunlightGuide/Index.vue'),
  },
  {
    path: PageEnum.BLIGHT_GUIDE,
    name: PageNameEnum.BLIGHT_GUIDE,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/guide/BlightGuide/Index.vue'),
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
