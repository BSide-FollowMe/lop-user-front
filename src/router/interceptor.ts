import $store from '@/store';
import { Router } from 'vue-router';
import routes from './routes';
import { tokenSvc } from '@/api/token-service';

export function setupNavigationGuarder(router: Router) {
  router.beforeEach(async (to: any, from: any, next: any) => {
    // if (isNotFound(to, routes)) {
    //   next('/not-found');
    //   return;
    // }
    const isPb = await isPublic(to);
    const loggedIn = await tokenSvc.isValidToken();
    if (!isPb && !loggedIn) {
      next('/signin');
      return;
    }
    next();
  });
}

const isNotFound = (to: any, routes: Array<any>) => {
  const found: boolean = routes.some((r) => {
    return r.name === to.name;
  });
  return !found;
};

const isPublic = (to: any) => {
  return to.matched.some((record: any) => record.meta.public);
};


const isAuthenticated = (store: any) => {
  return store.getters.isAuthenticated;
};
