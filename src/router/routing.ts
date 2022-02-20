import router from './index';
import { PageEnum } from '@/enums/PageEnum';

export const ROUTE_TO = {
  LOGIN: () => router.push(PageEnum.LOGIN),
  HOME: () => router.push(PageEnum.HOME),
  ERROR_PAGE: () => router.push(PageEnum.ERROR_PAGE),
  LANDING: () => router.push(PageEnum.LANDING),
  PLANT_DETAILS: () => router.push(PageEnum.PLANT_DETAILS),
  SEARCH_RESULT: () => router.push(PageEnum.SEARCH_RESULT),
  QNABOARD: () => router.push(PageEnum.QNABOARD),
  QNABOARD_DETAIL: () => router.push(PageEnum.QNABOARD_DETAIL),
  QNABOARD_EDIT: () => router.push(PageEnum.QNABOARD_EDIT),
  MYPAGE: () => router.push(PageEnum.My_Page),
};
export const OPEN_LINK = {
  TOS: () => {
    openLink('https://sudden-daphne-2de.notion.site/e9a28847f12549b39923c048ea26f394');
  },
  PP: () => {
    openLink('https://sudden-daphne-2de.notion.site/47e8df6f7d174d5cb473284911dcd9d6');
  },
  INTRODUCTION: () => {
    openLink('https://sudden-daphne-2de.notion.site/fc69bacaad7c40439bab6775e4daf073');
  },
  MAIL: () => {
    openLink('mailto:plantslang@gmail.com');
  },
};

async function openLink(link: string) {
  try {
    const windowReference:any = await window.open();
    windowReference.location = link;
  } catch (error) {
    alert('브라우저 설정에서 팝업을 허용해주세요.');
  }
}
export const GO_BACK = () => router.go(-1);
export const GO_FORWARD = () => router.go(1);
export const GO_TO = (page: string) => router.push(page);
export const GO_TO_WITH_PARAMS = (page: string, params: any) => router.push({ path: page, query: params });
