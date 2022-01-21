import { GetAccountInfoModel, LoginParamModel, LoginRespModel } from '@/api/model/accountModel';
import { doLogin, doLogout } from '@/api/account';
import router from '@/router';
import { PageEnum } from '@/enums/PageEnum';
import { MessageEnum } from '@/enums/MessageEnum';
import { tokenSvc } from '@/api/token-service';

interface UserState {
  userId: string;
  userName: string;
  token: string;
  authenticated: boolean;
  sessionTimeout?: boolean;
}

const initState = () => {
  return {
    userId: '',
    userName: '',
    token: '',
    authenticated: false,
    sessionTimeout: false,
  };
};
const user = {
  state: initState(),
  getters: {
    isAuthenticated(state: UserState): boolean {
      return state.authenticated;
    },
    getUserInfo(state: UserState): UserState {
      return state;
    },
  },
  mutations: {
    resetState(state: UserState): void {
      Object.assign(state, initState());
    },
    setToken(state: UserState, payload: UserState): void {
      Object.assign(state, initState());
      state.userId = payload.userId;
      state.token = payload.token;
    },
    updateToken(state: UserState, payload: string): void {
      state.token = payload;
    },
  },
  actions: {
    async signIn({ commit }: any, payload: LoginParamModel) {
      try {
        const { data } = await doLogin(payload);
        const { id } = payload;
        const { jwt } = data;
        router.push(PageEnum.HOME);
        tokenSvc.setToken({ token:jwt, userId:id });
        return Promise.resolve()
      } catch (e) {
        console.error(e);
        alert(MessageEnum.LOGIN_FAILED);
        return Promise.reject(e);
      }
    },
    async signOut({ commit }: any): Promise<void> {
      try {
        await doLogout();
        return commit('resetState');
      } catch (e) {
        console.error(e);
      }
    },
    async setToken({ commit }: any, payload: UserState): Promise<void> {
      try {
        return commit('setToken', payload);
      } catch (e) {
        console.error(e);
      }
    },
    async updateToken({ commit }: any, token: string): Promise<void> {
      return commit('updateToken', token);
    },
  },
};
export default user;
