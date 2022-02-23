import { GetAccountInfoModel, LoginParamModel, LoginRespModel } from '@/api/model/accountModel';
import router from '@/router';
import { PageEnum } from '@/enums/PageEnum';
import { MessageEnum } from '@/enums/MessageEnum';
import { tokenSvc } from '@/api/token-service';

interface UserState {
  id: string;
  grade: string;
  nickname: string;
  token: string;
  authenticated: boolean;
  sessionTimeout?: boolean;
}

const initState = () => {
  return {
    id: '',
    grade: '',
    token: '',
    nickname: '',
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
      state.id = payload.id;
      state.token = payload.token;
      state.grade = payload.grade;
      state.nickname = payload.nickname;
    },
    updateToken(state: UserState, payload: string): void {
      state.token = payload;
    },
  },
  actions: {
    async signOut({ commit }: any): Promise<void> {
      try {
        return commit('resetState');
      } catch (e) {
        console.error(e);
      }
    },
    async setToken({ commit }: any, payload: UserState): Promise<void> {
      try {
        return commit('setToken', payload);
      } catch (e) {
        commit('resetState');
        console.error(e);
      }
    },
    async updateToken({ commit }: any, token: string): Promise<void> {
      return commit('updateToken', token);
    },
  },
};
export default user;
