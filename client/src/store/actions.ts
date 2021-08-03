import { Actions } from '@/types/vuexTypings';
import {
    ActionBindings,
    ActionTypes,
    AppState,
    MutationTypes,
} from '@/store/types';
import { AuthResource } from '@/recources/AuthResource';
import { IFormLogin, IRegisterUser } from '@/types/user';

const authResource = new AuthResource();

export const actions: Actions<ActionBindings, AppState, AppState> = {
    [ActionTypes.LOGIN]: async (
        { commit, dispatch, state },
        form: IFormLogin
    ) => {
        try {
            const objForm: IFormLogin = {
                email: form.email,
                password: form.password,
            };
            const response = await authResource.login(objForm);
            commit(MutationTypes.SET_TOKEN, response.data.token);
            commit(MutationTypes.SET_USER_ID, response.data.userId);

            await dispatch(
                ActionTypes.SET_TOKEN_TO_LOCAL_STORAGE,
                response.data.token
            );
        } catch (e) {
            commit(MutationTypes.SET_ERRORS, [
                ...state.errors,
                e.response.data.message ||
                    'Что-то пошло не так, попробуйте снова',
            ]);
        }
    },

    [ActionTypes.REGISTER]: async (
        { commit, dispatch, state },
        form: IRegisterUser
    ) => {
        try {
            const response = await authResource.registerNewUser(form);
            commit(MutationTypes.SET_TOKEN, response.data.token);
            commit(MutationTypes.SET_USER_ID, response.data.userId);
            commit(MutationTypes.SET_INFO, [
                ...state.info,
                response.data.message,
            ]);
            await dispatch(ActionTypes.SET_TOKEN_TO_LOCAL_STORAGE);
        } catch (e) {
            commit(MutationTypes.SET_ERRORS, [
                ...state.errors,
                e.response.data.message ||
                    'Что-то пошло не так, попробуйте снова',
            ]);
        }
    },

    [ActionTypes.SET_TOKEN_TO_LOCAL_STORAGE]: (_, token: string) => {
        localStorage.setItem('token', token);
    },
};
