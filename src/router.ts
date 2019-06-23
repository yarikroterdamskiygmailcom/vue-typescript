import Vue from 'vue';
import Router from 'vue-router';

import { routes as Updates } from '@/modules/Updates';
import { routes as Product } from '@/modules/Product';
import { routes as Products } from '@/modules/Products';
import { routes as Login } from '@/modules/Login';
import { routes as ChartHit } from '@/modules/ChartHit';
import { routes as ChartList } from '@/modules/ChartList';
import { routes as UIelements } from '@/modules/UIelements';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: process.env.BASE_URL,
  }],
});


router.addRoutes([
  Updates,
  Product,
  Products,
  Login,
  ChartHit,
  ChartList,
  UIelements,
]);

router.beforeEach ((to, from, next) => {
  if ((to.path === '/' || to.path === '/login') && localStorage.getItem('jwt') && !to.query.auth) {
    next('/updates');
  }

  if (to.query.auth) {
    localStorage.clear();

    store.dispatch({
      type: 'getUserData',
      auth: to.query.auth,
      contractid: to.query.contract_id,
    }).then((res) => {
      if (res.jwt && res.contract_id ) {
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('contract_id', res.contract_id);
        next('/updates');
      } else {
        next('/login');
      }
    });
  } else if (localStorage.getItem('jwt') == null && to.path !== '/login') {
    localStorage.clear();

    next('/login');
  } else if (localStorage.getItem('jwt')) {
    store.dispatch({
      type: 'setUserData',
      jwt: localStorage.getItem('jwt'),
      isAdmin: store.state.userData.isAdmin,
    });
    next();
  } else {
    next();
  }
});

export default router;
