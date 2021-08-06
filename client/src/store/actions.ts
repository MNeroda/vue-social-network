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
            commit(MutationTypes.SET_TOKEN, response.data.token);

            await dispatch(
                ActionTypes.SET_TOKEN_TO_LOCAL_STORAGE,
                response.data.token
            );
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
            const tokenDecrypted = getDataFromJWT(response.data.token);
            console.log(tokenDecrypted);
            commit(MutationTypes.SET_TOKEN, response.data.token);

            await dispatch(ActionTypes.SET_TOKEN_TO_LOCAL_STORAGE);
        } catch (e) {
            console.log(e);
        }
    },

    [ActionTypes.SET_TOKEN_TO_LOCAL_STORAGE]: (_, token: string) => {
        localStorage.setItem('token', token);
    },
};
