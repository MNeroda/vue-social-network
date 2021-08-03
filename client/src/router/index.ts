import Vue, { VueConstructor } from 'vue';
import VueRouter from 'vue-router';

import { RegisterPage, LoginPage, HomePage } from '@/views';
import { AuthResource } from '@/recources/AuthResource';
import store from '@/store';
import { MutationTypes } from '@/store/types';

Vue.use(VueRouter);

export enum RouteNames {
    LOGIN_PAGE = 'LOGIN_PAGE',
    REGISTER_PAGE = 'REGISTER_PAGE',
    HOME_PAGE = 'HOME_PAGE',
    PAGE_404 = 'PAGE_404'
}

interface IMetaLayout {
    path: string;
    name: RouteNames;
    component: VueConstructor;
    meta?: {
        layout?: 'authorized-layout' | 'unauthorized-layout';
        auth?: boolean;
    };
    redirect?: string;
}

const routes: Array<IMetaLayout> = [
    {
        path: '*',
        name : RouteNames.PAGE_404,
        redirect: '/register',
        component: RegisterPage,
        meta: {
            layout: 'unauthorized-layout'
        }
    },
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
        meta: {
            auth: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requireAuth = to.matched.some((record) => record.meta.auth);
    if (!requireAuth) return next();

    const token = localStorage.getItem('token');
    if (!token) return next('/login');

    const authRecourse = new AuthResource();
    const isValidToken = await authRecourse.checkAuth(token);
    if (isValidToken) return next();

    store.commit(MutationTypes.SET_TOKEN, '');
    store.commit(MutationTypes.SET_USER_ID, '');
    localStorage.removeItem('token');
    return next('/login');
});

export default router;
