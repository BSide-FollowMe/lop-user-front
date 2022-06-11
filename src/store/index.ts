import { createStore } from 'vuex';
import user from './modules/user';
import snack from './modules/snack';
import LoadingProgress from './modules/loading-progress';

export default createStore({
  modules: {
    user,
    snack,
    LoadingProgress,
  },
});
