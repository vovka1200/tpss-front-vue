import {createRouter, createWebHistory} from 'vue-router'
import About from './pages/About.vue'
import Clients from "./pages/Clients.vue";
import Client from "./pages/Client.vue";
import Settings from "./pages/Settings.vue";
import GroupsTable from '@/components/settings/access/groups/Table.vue';
import UsersTable from '@/components/settings/access/users/Table.vue';
import ParamsTable from '@/components/settings/params/Table.vue';
import User from '@/pages/User.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Начало',
            path: '/',
            redirect: '/about',
        },
        {
            name: 'О программе',
            path: '/about',
            component: About,
        },
        {
            name: 'Клиенты',
            path: '/clients',
            component: Clients,
        },
        {
            name: 'Клиент',
            path: '/clients/:id',
            component: Client,
        },
        {
            name: 'Настройки',
            path: '/settings',
            component: Settings,
            redirect: '/settings/users',
            children: [
                {
                    name: 'Пользователи',
                    path: 'users',
                    component: UsersTable,
                },
                {
                    name: 'Группы',
                    path: 'groups',
                    component: GroupsTable,
                },
                {
                    name: 'Параметры',
                    path: 'params',
                    component: ParamsTable,
                },
            ],
        },
        {
            name: 'Пользователь',
            path: '/users/:id/profile',
            component: User,
        },
    ],
})
