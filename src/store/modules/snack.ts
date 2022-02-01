import { Commit, Getter } from 'vuex';

interface Snack {
  snack: string;
  link: string;
  color: string;
}

const initState: Snack = {
  snack: '',
  link: '',
  color: 'black',
};
let timeoutHandler :any= null
export default {
  namespaced: true,

  state: initState,
  getters: {
    snack(state: Snack): string {
      return state.snack;
    },
    link(state: Snack): string {
      return state.link;
    },
    color(state:Snack): string{
      return state.color;
    }
  },
  mutations: {
    SET_SNACK(state: Snack, text: string): void {
      state.snack = text;
    },
    SET_LINK(state: Snack, link: string): void {
      state.link = link;
    },
    SET_COLOR(state: Snack,link:string):void{
      state.color = link;
    }
  },
  actions: {
    openSnack({ commit,getters }: { commit: Commit,getters: any }, { text, link = '', delay = 5000, color='black' }: { text: string; link: string; delay: number,color:string }): void {
      clearTimeout(timeoutHandler);
      commit('SET_SNACK', '');
      commit('SET_LINK', '');
      commit('SET_COLOR', 'black');
      setTimeout(()=>{
        commit('SET_SNACK', text);
        commit('SET_LINK', link);
        commit('SET_COLOR', color);
      },0)
      timeoutHandler = setTimeout(() => {
        commit('SET_SNACK', '');
        commit('SET_LINK', '');
        commit('SET_COLOR', 'black');
      }, delay);
    },
  },
};
