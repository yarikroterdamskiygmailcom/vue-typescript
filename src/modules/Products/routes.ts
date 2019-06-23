const Products = () => import(/* webpackChunkName: "products" */'./containers/Products.vue');

export default {
  path: '/products',
  component: Products,
  name: 'products',
};
