import { RouteRecordRaw } from 'vue-router';
import { LayoutEnum, PageEnum, PageNameEnum } from '@/enums/PageEnum';
const routes: Array<RouteRecordRaw> = [
  {
    path: PageEnum.LANDING,
    redirect: PageEnum.HOME,
    meta: { public: true, layout: LayoutEnum.FILLED },
  },
  {
    path: PageEnum.HOME,
    name: PageNameEnum.HOME,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/home/Index.vue'),
  },
  {
    path: PageEnum.PLANT_DETAILS,
    name: PageNameEnum.PLANT_DETAILS,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/plantDetail/Index.vue'),
  },
  {
    path: PageEnum.My_PAGE,
    meta: { public: false, layout: LayoutEnum.DEFAULT, backgroundColor: '#F8F8F8' },
    component: () => import('@/views/myPage/Index.vue'),
    children: [
      {
        path: '',
        meta: { public: false },
        name: PageNameEnum.My_PAGE,
        component: () => import('@/views/myPage/MyPage/Index.vue'),
      },
      {
        path: 'setting',
        meta: { public: false },
        name: PageNameEnum.SETTING,
        component: () => import('@/views/myPage/Setting/Index.vue'),
      },
      {
        path: 'my-plant',
        meta: { public: false },
        name: PageNameEnum.My_Plant,
        component: () => import('@/views/myPage/MyPlant/Index.vue'),
      },
      {
        path: 'qna',
        meta: { public: false },
        name: PageNameEnum.MY_QNA,
        component: () => import('@/views/myPage/QnA/Index.vue'),
      },
      {
        path: 'seed',
        meta: { public: false },
        name: PageNameEnum.SEED_STORE,
        component: () => import('@/views/myPage/SeedStore/Index.vue'),
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
    meta: { public: false, layout: LayoutEnum.DEFAULT },
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
    path: PageEnum.ALL_PLANTS,
    name: 'Modal Test',
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/allPlants/Index.vue'),
  },
  {
    path: PageEnum.STORY,
    name: PageNameEnum.STORY_FEED,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/story/Feed/Index.vue'),
  },
  {
    path: PageEnum.STORY_DETAIL,
    name: PageNameEnum.STORY_DETAIL,
    meta: { public: true, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/story/Detail/Index.vue'),
  },
  {
    path: PageEnum.STORY_REGISTER,
    name: PageNameEnum.STORY_REGISTER,
    meta: { public: false, layout: LayoutEnum.DEFAULT },
    component: () => import('@/views/story/Register/Index.vue'),
  },
  {
    path: PageEnum.ERROR_PAGE,
    name: PageNameEnum.ERROR_PAGE,
    meta: { public: true, layout: LayoutEnum.FILLED },
    component: () => import('@/views/error/NotFound.vue'),
  },
];
export default routes;
