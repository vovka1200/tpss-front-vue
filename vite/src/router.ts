import {createRouter, createWebHistory} from 'vue-router'
import About from './pages/About.vue'
import Account from "./pages/Account.vue";
import Clients from "./pages/Clients.vue";
import Settings from "./pages/Settings.vue";

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
        {
            path: '/clients',
            component: Clients,
        },
        {
            path: '/settings',
            component: Settings,
        },
    ],
})
