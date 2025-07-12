import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./pages/Home.vue'),
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
