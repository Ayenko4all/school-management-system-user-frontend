import Vue from 'vue';
import router from './Routes/index.js';
import  VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "./Store/index.js";
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

