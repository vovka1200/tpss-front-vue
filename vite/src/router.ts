import {createRouter, createWebHistory} from 'vue-router'
import About from './pages/About.vue'
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
            path: '/clients',
            component: Clients,
        },
        {
            path: '/settings',
            component: Settings,
        },
    ],
})
