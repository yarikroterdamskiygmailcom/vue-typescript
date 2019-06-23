const Product = () => import(/* webpackChunkName: "product" */'./containers/Product.vue');

export default {
  path: '/products/:id',
  name: 'product',
  component: Product,
};
