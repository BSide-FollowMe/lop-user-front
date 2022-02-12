import axios from '@/utils/http/axios';
import { LoginParamModel, LoginRespModel } from './model/accountModel';

const API_PREFIX = '';
enum Api {
  LOGIN = '/login',
  KAKAO_LOGIN = '/oauth2/authorization/kakao',
  NAVER_LOGIN = '/oauth2/authorization/naver',
  LOGOUT = '/logout',
  ACCOUNT_INFO = '/account/getAccountInfo',
}

export function doLogin(params: LoginParamModel): any {
  return axios.post<LoginRespModel>(API_PREFIX + Api.LOGIN, params);
}

export function doKakaoLogin(e: any): any {
  const API_HOST = process.env?.VUE_APP_API_URL;
  if (!e.screenX) {
    return;
  }
  const urlSum = API_HOST + API_PREFIX + Api.KAKAO_LOGIN;
  window.open(urlSum, '_self');
}

export function doNaverLogin(e: any): any {
  const API_HOST = process.env?.VUE_APP_API_URL;
  if (!e.screenX) {
    return;
  }
  const urlSum = API_HOST + API_PREFIX + Api.NAVER_LOGIN;
  window.open(urlSum, '_self');
}

export function doLogout(): Promise<unknown> {
  return axios.get(API_PREFIX + Api.LOGOUT);
}
