import Vue from 'vue';
import Vuetify from 'vuetify';

// @ts-ignore
import {i18n, setLanguage} from './i18n';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

setLanguage().then(() => new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app'));
