import $store from '@/store';
import { localStorage } from './local-storage';

const STORAGE_KEY = 'lop.tokenInfo';
const STORAGE_USR = 'lop.userInfo';
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const svc = {
  async getToken() {
    const token = await $store.getters.getUserInfo;
    if (!token.token) {
      const stoken = await localStorage.getLocalItem(STORAGE_USR);
      if (stoken) {
        $store.dispatch('setToken', stoken);
        return stoken;
      }
    }
    return token;
  },
  async isValidToken() {
    const token = await this.getToken();
    if (!token.token) return false;

    const payload = parseJwt(token.token);
    if (!payload) return false;

    return payload.exp * 1000 > Date.now();
  },
  async isExpired() {
    const token = await this.getToken();
    if (!token.token) return false;
    const payload = parseJwt(token.token);
    if (!payload) return false;
    return payload.exp * 1000 < Date.now();
  },
  async setToken(userInfo: any): Promise<void> {
    $store.dispatch('setToken', userInfo);
    localStorage.setLocalItem(STORAGE_USR, Object.assign({}, userInfo));
  },
  async updateToken(token: string): Promise<void> {
    $store.dispatch('updateToken', token);
    token = await this.getToken();
    localStorage.setLocalItem(STORAGE_KEY, token);
  },
  async removeToken(): Promise<void> {
    $store.dispatch('signout');
    await localStorage.removeLocalItem(STORAGE_KEY);
    await localStorage.removeLocalItem(STORAGE_USR);
  },
};

export { svc as tokenSvc };
