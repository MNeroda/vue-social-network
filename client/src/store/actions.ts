import store from '@/store';
import { Actions } from '@/types/vuexTypings';
import {
    ActionBindings,
    ActionTypes,
    AppState,
    MutationTypes,
} from '@/store/types';
import { AuthResource } from '@/recources/AuthResource';
import { IFormLogin, IFormRegister } from '@/types/user';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { getDataFromJWT, IDecryptedToken } from '@/modules/helpers/JWTHelper';

import Vue from 'vue';
import router from '@/router';

const authResource = new AuthResource();

function setTokenTimeout(tokenData: IDecryptedToken) {
    const timeout = setTimeout(() => {
        store.dispatch(ActionTypes.REFRESH_TOKEN);
    }, tokenData.exp * 1000 - Date.now() - 60000);
    store.commit(MutationTypes.SET_PREV_TOKEN_TIMEOUT, timeout);
}

function setAccessToken(accessToken: string) {
    document.cookie = `access-token=${accessToken}`;
}

export const actions: Actions<ActionBindings, AppState, AppState> = {
    [ActionTypes.LOGIN]: async (
        { commit, dispatch, state },
        form: IFormLogin
    ) => {
        try {
            const fpPromise = await FingerprintJS.load();
            const fingerPrint = await fpPromise.get();
            const objForm: IFormLogin = {
                email: form.email,
                password: form.password,
            };
            const token = await authResource.login({
                ...objForm,
                fingerPrint: fingerPrint.visitorId,
            });
            if (token) {
                setAccessToken(token.data.accessToken);
                const tokenData = getDataFromJWT(token.data.accessToken);
                commit(MutationTypes.SET_TOKEN, token.data.accessToken);
                commit(MutationTypes.SET_USER_ID, tokenData.userId);
                setTokenTimeout(token.data.accessToken);
                await router.push('/');
            }
        } catch (e) {
            console.log(e);
        }
    },

    [ActionTypes.REGISTER]: async (
        { commit, dispatch, state },
        form: IFormRegister
    ) => {
        try {
            const fpPromise = await FingerprintJS.load();
            const fingerPrint = await fpPromise.get();
            const token = await authResource.registerNewUser({
                ...form,
                fingerPrint: fingerPrint.visitorId,
            });
            setAccessToken(token.data.accessToken);

            commit(MutationTypes.SET_TOKEN, token.data.accessToken);
            const tokenData = getDataFromJWT(token.data.accessToken);
            commit(MutationTypes.SET_USER_ID, tokenData.userId);
            setTokenTimeout(token.data.accessToken);
        } catch (e) {
            console.log(e);
        }
    },
    [ActionTypes.REFRESH_TOKEN]: async ({ commit, dispatch }) => {
        try {
            const fpPromise = await FingerprintJS.load();
            const fingerPrint = await fpPromise.get();
            const token = await authResource.refreshToken(
                fingerPrint.visitorId
            );
            if (!token) {
                await dispatch(ActionTypes.LOGOUT);
                return;
            }
            setAccessToken(token.data.accessToken);

            commit(MutationTypes.SET_TOKEN, token.data.accessToken);
            const tokenData = getDataFromJWT(token.data.accessToken);
            commit(MutationTypes.SET_USER_ID, tokenData.userId);
            setTokenTimeout(tokenData);
            Vue.$__set_websocket_token(token.data.accessToken);
            return;
        } catch (e) {
            await dispatch(ActionTypes.LOGOUT);
            return;
        }
    },

    [ActionTypes.LOGOUT]: async ({ commit }) => {
        commit(MutationTypes.SET_TOKEN, '');
        commit(MutationTypes.SET_PREV_TOKEN_TIMEOUT, undefined);
        await authResource.logout();
        Vue.$__close_websocket_connection();
    },
};
