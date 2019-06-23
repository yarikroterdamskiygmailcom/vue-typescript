import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import State from './state';
import actions from './actions';
import mutations from './mutations';

const debug: boolean = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Store<State>({
  state: new State(),
  plugins: [createPersistedState()],
  mutations,
  actions,
  strict: debug,
});
