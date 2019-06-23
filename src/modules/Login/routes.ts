const Login = () => import(/* webpackChunkName: "login" */'./containers/Login.vue');

export default {
  path: '/login',
  component: Login,
  name: 'login',
};
