import axios from '@/utils/http/axios';
import { LoginParamModel, LoginRespModel } from './model/accountModel';

const API_PREFIX = '/v1';
enum Api {
  LOGIN = '/login',
  KAKAO_LOGIN = '/oauth2/authorization/kakao',
  NAVER_LOGIN = '/oauth2/authorization/naver',

  ACCOUNT_INFO = '/members/me',
}

export function doKakaoLogin(e: any): any {
  const API_HOST = process.env?.VUE_APP_API_URL;
  if (!e.screenX) {
    return;
  }
  const urlSum = API_HOST + Api.KAKAO_LOGIN;
  window.open(urlSum, '_self');
}

export function doNaverLogin(e: any): any {
  const API_HOST = process.env?.VUE_APP_API_URL;
  if (!e.screenX) {
    return;
  }
  const urlSum = API_HOST + Api.NAVER_LOGIN;
  window.open(urlSum, '_self');
}
export function getAccountInfo(): Promise<unknown> {
  return axios.get(API_PREFIX + Api.ACCOUNT_INFO);
}
