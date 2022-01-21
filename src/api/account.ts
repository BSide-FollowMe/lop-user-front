import axios from '@/utils/http/axios';
import { LoginParamModel, LoginRespModel } from './model/accountModel';

const API_PREFIX = '/v1';
enum Api {
  LOGIN = '/login',
  LOGOUT = '/logout',
  ACCOUNT_INFO = '/account/getAccountInfo',
}

export function doLogin(params: LoginParamModel): any {
  return axios.post<LoginRespModel>(API_PREFIX + Api.LOGIN, params);
}

export function doLogout(): Promise<unknown> {
  return axios.get(API_PREFIX + Api.LOGOUT);
}
