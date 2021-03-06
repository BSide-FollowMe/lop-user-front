import axios from 'axios';
import { tokenSvc } from '@/api/token-service';

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
    const token = response.headers.authorization;
    if (token) {
      tokenSvc.updateToken(token);
    }
    return response;
  },
  function (error) {
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
