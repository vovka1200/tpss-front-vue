import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/about',
            component: () => import('./pages/About.vue'),
        },
        {
            path: '/contact',
            component: () => import('./pages/Contacts.vue'),
        },
    ],
})
