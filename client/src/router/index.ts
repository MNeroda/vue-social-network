import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import {
    RegisterPage,
    LoginPage,
    Page404,
    UserPage,
    ChatPage,
    ProfilePage,
    FriendsPage,
    TestPage
} from '@/views';
import store from '@/store';
import { ActionTypes } from '@/store/types';
import { getDataFromJWT } from '@/modules/helpers/JWTHelper';

Vue.use(VueRouter);

export enum RouteNames {
    LOGIN_PAGE = 'LOGIN_PAGE',
    REGISTER_PAGE = 'REGISTER_PAGE',
    PAGE_404 = 'PAGE_404',
    PAGE_404_REDIRECT = 'PAGE_404',
    USER_PAGE = 'USER_PAGE',
    CHAT_PAGE = 'CHAT_PAGE',
    PROFILE_PAGE = 'PROFILE_PAGE',
    FRIENDS_PAGE = 'FRIENDS_PAGE',
    TEST_PAGE = 'TEST_PAGE'
}

type RoutesType = RouteConfig & {
    name: RouteNames;
    meta?: {
        layout?: 'authorized-layout' | 'unauthorized-layout' | 'chat-layout';
        auth?: boolean;
    };
};

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
        name: RouteNames.USER_PAGE,
        component: UserPage,
        meta: {
            auth: true,
        },
    },
    {
        path: '/user/:id',
        name: RouteNames.USER_PAGE,
        component: UserPage,
    },
    {
        path: '/chat',
        name: RouteNames.CHAT_PAGE,
        component: ChatPage,
        meta: {
            layout: 'chat-layout',
            auth: true,
        },
    },
    {
        path: '/chat/:id',
        name: RouteNames.CHAT_PAGE,
        component: ChatPage,
        meta: {
            layout: 'chat-layout',
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
        path: '/friends',
        name: RouteNames.FRIENDS_PAGE,
        component: FriendsPage,
    },
    {
        path: '*',
        name: RouteNames.PAGE_404_REDIRECT,
        redirect: '/page404',
        component: Page404,
        meta: {
            layout: 'unauthorized-layout',
        },
    },
    {
        path: '/test',
        name: RouteNames.TEST_PAGE,
        component: TestPage,
        meta: {
            layout: 'unauthorized-layout',
        },
    }
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
