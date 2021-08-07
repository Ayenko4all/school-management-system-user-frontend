import Home from '../Pages/Home.vue'
let routes = [
    {
        path: '/',
        name: 'redirect',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }

];

export default routes


