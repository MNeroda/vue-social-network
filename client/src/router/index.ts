import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import {
    RegisterPage,
    LoginPage,
    Page404,
    HomePage,
    ChatPage,
    ProfilePage,
} from '@/views';
import store from '@/store';
import { ActionTypes } from '@/store/types';
import { getDataFromJWT } from '@/modules/helpers/JWTHelper';

Vue.use(VueRouter);

export enum RouteNames {
    LOGIN_PAGE = 'LOGIN_PAGE',
    REGISTER_PAGE = 'REGISTER_PAGE',
    PAGE_404 = 'PAGE_404',
    HOME_PAGE = 'HOME_PAGE',
    CHAT_PAGE = 'CHAT_PAGE',
    PROFILE_PAGE = 'PROFILE_PAGE',
}

type MetaType = {
    meta?: {
        layout?: 'authorized-layout' | 'unauthorized-layout';
        auth?: boolean;
    };
};

type RoutesType = RouteConfig & MetaType;

const routes: Array<RoutesType> = [
    {
        path: '/page404',
        name: RouteNames.PAGE_404,
        component: Page404,
        meta: {
            layout: 'unauthorized-layout',
        },
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
    {
        path: '/chat',
        name: RouteNames.CHAT_PAGE,
        component: ChatPage,
        meta: {
            auth: true,
        },
    },
    {
        path: '/chat/:id',
        name: RouteNames.CHAT_PAGE,
        component: ChatPage,
        meta: {
            auth: true,
        },
    },
    {
        path: '/profile',
        name: RouteNames.PROFILE_PAGE,
        component: ProfilePage,
        meta: {
            auth: true,
        },
    },
    {
        path: '*',
        name: RouteNames.PAGE_404,
        redirect: '/page404',
        component: Page404,
        meta: {
            layout: 'unauthorized-layout',
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

    try {
        const tokenData = getDataFromJWT(token);
        if (tokenData.exp * 1000 < Date.now()) {
            await store.dispatch(ActionTypes.REFRESH_TOKEN);
            if (!store.state.token) return next('/login');
        }
        return next();
    } catch (e) {
        return next('/login');
    }
});
export default router;
