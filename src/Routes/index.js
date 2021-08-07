import VueRouter from 'vue-router'
import routes from './routes.js'

export default new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'is-active',
})
