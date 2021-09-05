import Vue from 'vue';
import router from './Routes/routes.js';
import  VueRouter from 'vue-router';
import Axios from 'axios'
//import VueAxios from 'vue-axios'
import store from "./Store/index.js";
import App from './App.vue'

Vue.use(VueRouter);
//Vue.use(VueAxios, axios);
Vue.prototype.$http = Axios;
// const token = localStorage.getItem('token');
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

