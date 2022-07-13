import axios from 'axios';
import { tokenSvc } from '@/api/token-service';
import $store from '@/store';
import { ignorableKeyModifiers } from '@vue/test-utils/dist/constants/dom-events';
import router from '@/router';

const options: any = {};
const { NODE_ENV } = process.env;
if (NODE_ENV == 'production') {
  const apiUrl = process.env?.VUE_APP_API_URL;
  options.baseURL = apiUrl;
  options.withCredentials = true;
}

const _axios = axios.create(options);

_axios.interceptors.request.use(
  async function (config: any) {
    $store.dispatch('showLoader');
    // if (await tokenSvc.isExpired()) {
    // }
    const token = await tokenSvc.getToken();
    if (token && token.token) {
      config.headers['Authorization'] = `Bearer ${token.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
_axios.interceptors.response.use(
  function (response) {
    $store.dispatch('hideLoader');
    const token = response.headers.authorization;
    if (token) {
      tokenSvc.updateToken(token);
    }
    return response;
  },
  function (error) {
    $store.dispatch('hideLoader');
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      alert('먼저 로그인 해주세요!');
      router.push('/signin');
    }
    return Promise.reject(error);
  },
);

export default _axios;

export { encodeQueryData };
function encodeQueryData(data: any) {
  const ret = [];
  for (const d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}
