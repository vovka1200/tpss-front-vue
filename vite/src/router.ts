import {createRouter, createWebHistory} from 'vue-router'
import About from './pages/About.vue'
import Clients from "./pages/Clients.vue";
import Client from "./pages/Client.vue";
import Settings from "./pages/Settings.vue";
import GroupsTable from '@/components/settings/access/groups/Table.vue';
import UsersTable from '@/components/settings/access/users/Table.vue';
import ParamsTable from '@/components/settings/params/Table.vue';

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
            path: '/clients/:id',
            component: Client,
        },
        {
            path: '/settings',
            component: Settings,
        },
        {
            path: '/settings',
            component: Settings,
            children: [{
                path: 'users',
                component: UsersTable,
            }],
        },
        {
            path: '/settings',
            component: Settings,
            children: [{
                path: 'groups',
                component: GroupsTable,
            }],
        },
        {
            path: '/settings',
            component: Settings,
            children: [{
                path: 'params',
                component: ParamsTable,
            }],
        },
    ],
})
