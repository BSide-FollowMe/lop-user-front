import router from '@/router';
import { PageEnum } from '@/enums/PageEnum';
import { MessageEnum } from '@/enums/MessageEnum';
import { tokenSvc } from '@/api/token-service';
import { MemberLevel, Member } from '@/types/api/member';

type UserState = Member & {
  token: string;
  authenticated: boolean;
  sessionTimeout?: boolean;
};

const initState = () => {
  return {
    id: '',
    memberLevel: null,
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
      state.memberLevel = payload.memberLevel;
      state.nickname = payload.nickname;
    },
    updateToken(state: UserState, payload: string): void {
      state.token = payload;
    },
    updateUserInfo(state: UserState, payload: { memberLevel: MemberLevel; nickname: string }): UserState {
      state.memberLevel = payload.memberLevel;
      state.nickname = payload.nickname;
      return state;
    },
    setAuthenticated(state: UserState): UserState {
      state.authenticated = true;
      return state;
    },
  },
  actions: {
    async signOut({ commit }: any): Promise<void> {
      try {
        return await commit('resetState');
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
    setIsAuthenticated({ commit }: any, payload: boolean): void {
      if (!payload) {
        commit('resetState');
      } else {
        commit('setAuthenticated');
      }
    },
    async updateToken({ commit }: any, token: string): Promise<void> {
      return commit('updateToken', token);
    },
    updateUserInfo({ commit }: any, payload: { memberLevel: MemberLevel; nickname: string }): UserState {
      return commit('updateUserInfo', payload);
    },
  },
};
export default user;
