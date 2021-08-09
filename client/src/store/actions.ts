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
import { getDataFromJWT } from '@/modules/helpers/JWTHelper';

const authResource = new AuthResource();

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
            const response = await authResource.login({
                ...objForm,
                fingerPrint: fingerPrint.visitorId,
            });
            console.log(response);
            commit(MutationTypes.SET_TOKEN, response.data.accessToken);
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
            const response = await authResource.registerNewUser({
                ...form,
                fingerPrint: fingerPrint.visitorId,
            });
            commit(MutationTypes.SET_TOKEN, response.data.accessToken);
        } catch (e) {
            console.log(e);
        }
    },
    [ActionTypes.REFRESH_TOKEN]: async ({ commit, dispatch, state }) => {
        try {
            const fpPromise = await FingerprintJS.load();
            const fingerPrint = await fpPromise.get();
            const token = await authResource.refreshToken(
                fingerPrint.visitorId
            );
            if (!token) return;
            commit(MutationTypes.SET_TOKEN, token.data.accessToken);
            const tokenData = getDataFromJWT(token.data.accessToken);

            //Когда закончится жизнь токена обновить его,
            //делаю это заранее за 60 секунд, чтобы исключить проблемы
            const resetTokenTimeout = setTimeout(() => {
                dispatch(ActionTypes.REFRESH_TOKEN);
            }, tokenData.exp * 1000 - Date.now() - 60000);
            commit(MutationTypes.SET_PREV_TOKEN_TIMEOUT, resetTokenTimeout);
        } catch (e) {
            commit(MutationTypes.SET_TOKEN, '');
        }
    },

    [ActionTypes.LOGOUT]: async ({ commit }) => {
        commit(MutationTypes.SET_TOKEN, '');
        commit(MutationTypes.SET_PREV_TOKEN_TIMEOUT, undefined);
        await authResource.logout();
    },
};
