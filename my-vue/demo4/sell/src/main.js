// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import router from './router';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';
import './common/stylus/index.styl';
Vue.use(VueRouter);
Vue.use(VueResource);

// Vue.config.productionTip = false;
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// });
let router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/seller', component: seller },
    { path: '/', redirect: '/goods' }
  ]
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
