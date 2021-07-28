import Vue, { VueConstructor } from 'vue';
import VueRouter from 'vue-router';

import { RegisterPage, LoginPage, HomePage } from '@/views';

Vue.use(VueRouter);

export enum RouteNames {
    LOGIN_PAGE = 'LOGIN_PAGE',
    REGISTER_PAGE = 'REGISTER_PAGE',
    HOME_PAGE = 'HOME_PAGE',
}

interface IMetaLayout {
    path: string;
    name: RouteNames;
    component: VueConstructor;
    meta?: {
        layout: 'authorized-layout' | 'unauthorized-layout';
    };
}

const routes: Array<IMetaLayout> = [
    {
        path: '/login',
        name: RouteNames.LOGIN_PAGE,
        component: LoginPage,
        meta: {
            layout: 'unauthorized-layout',
        },
    },
    {
        path: '/register',
        name: RouteNames.REGISTER_PAGE,
        component: RegisterPage,
        meta: {
            layout: 'unauthorized-layout',
        },
    },
    {
        path: '/',
        name: RouteNames.HOME_PAGE,
        component: HomePage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
