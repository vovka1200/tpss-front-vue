import {createRouter, createWebHistory} from 'vue-router'
import About from './pages/About.vue'
import Account from "./pages/Account.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/about',
        },
        {
            path: '/about',
            component: About,
        },
        {
            path: '/account',
            component: Account,
        },
    ],
})
