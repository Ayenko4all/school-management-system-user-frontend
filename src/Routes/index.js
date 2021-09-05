// import VueRouter from 'vue-router'
// import routes from './routes.js'
// import store from "../Store";
//
// const router = new VueRouter({
//     routes,
//     mode: 'history',
//     linkActiveClass: 'is-active',
// });
//
// router.beforeEach((to, from, next) => {
//     // eslint-disable-next-line no-unused-vars
//     //let meta = this.$route.requiresAuth;
//     if (to.matched.some(record =>  record.meta.requiresAuth)){
//         if (store.getters.isLoggedIn){
//             next();
//             return
//         }
//         next('/login')
//     }else {
//         next();
//     }
//
// });
//
// export default router;
