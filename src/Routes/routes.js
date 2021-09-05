import store from "../Store/index";
import VueRouter from "vue-router";
import Home from '../Pages/Home.vue'
import Login from '../Pages/Auth/Login.vue'
import Register from '../Pages/Auth/Register.vue'
import ForgetPassword from '../Pages/Auth/ForgetPassword.vue'
import ResetPassword from '../Pages/Auth/ResetPassword.vue'
import VerifyToken from '../Pages/Auth/VerifyToken.vue'
import RequestEmailToken from  '../Pages/Auth/RequestEmailToken'
import Dashboard from '../Pages/Dashboard.vue'
import Module from '../Pages/SiteOwner/module.vue'




const routes = [
    {
        path: '/',
        name: 'redirect',
        redirect: '/dashboard'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { title: 'Home'}
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', requireAuth: true}
    },
    {
        path: '/Login',
        name: 'login',
        component: Login,
        meta: { title: 'Login',sidebar:false,header:false,footerBar:false}
    },
    {
        path: '/Register',
        name: 'register',
        component: Register,
        meta: { title: 'Register',sidebar:false,header:false,footerBar:false}
    },
    {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgetPassword,
        meta: { title: 'ForgetPassword',sidebar:false,header:false,footerBar:false},
        // beforeRouteLeave: (to, from, next) => {
        //     if (localStorage.getItem('type') == null) {
        //         next(false);
        //     }
        // }
    },
    {
        path: '/request-email-token',
        name: 'requestEmailToken',
        component: RequestEmailToken,
        meta: { title: 'requestEmailToken',sidebar:false,header:false,footerBar:false}
    },
    {
        path: '/reset-password',
        name: 'resetPassword',
        component: ResetPassword,
        meta: { title: 'ResetPassword',sidebar:false,header:false,footerBar:false},
    },
    {
        path: '/verify-token',
        name: 'verifyToken',
        component: VerifyToken,
        meta: { title: 'VerifyToken',sidebar:false,header:false,footerBar:false},
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('type')) {
                next();
            } else {
                from()
            }
        },

    },
    {
        path: '/site-admin-module',
        name: 'module',
        component: Module,
        meta: { title: 'Module', requireAuth: true}
    },

];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
    linkActiveClass: 'is-active',
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(record =>  record.meta.requireAuth)){
        if (store.getters.isLoggedIn){
            next();
            return
        }
        next('/login')
    }else {
        next();
    }

});



export default router


