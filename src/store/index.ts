import { createStore } from 'vuex';
import user from './modules/user';
import snack from './modules/snack';

export default createStore({
  modules: {
    user,
    snack,
  },
});
