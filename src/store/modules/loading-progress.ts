import { Commit } from 'vuex';

interface Loader {
  show: boolean;
}

const initState: Loader = {
  show: false,
};
export default {
  state: initState,
  getters: {
    isLoading(state: Loader): boolean {
      return state.show;
    },
  },
  mutations: {
    SET_SHOW(state: Loader, show: boolean): void {
      state.show = show;
    },
  },
  actions: {
    showLoader({ commit }: { commit: Commit }): void {
      commit('SET_SHOW', true);
    },
    hideLoader({ commit }: { commit: Commit }): void {
      commit('SET_SHOW', false);
    },
  },
};
