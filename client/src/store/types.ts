import { MutationTree } from 'vuex';
import { IFormLogin, IFormRegister } from '@/types/user';

export interface AppState {
    token: string;
    prevTokenTimeout: ReturnType<typeof setTimeout> | undefined;
}

export enum MutationTypes {
    SET_TOKEN = 'SET_TOKEN',
    SET_PREV_TOKEN_TIMEOUT = 'SET_RESET_TOKEN_TIMEOUT',
}

export type Mutations<S = AppState> = {
    [MutationTypes.SET_TOKEN]: (state: S, token: string) => void;
    [MutationTypes.SET_PREV_TOKEN_TIMEOUT]: (
        state: S,
        timeouts: ReturnType<typeof setTimeout> | undefined
    ) => void;
} & MutationTree<AppState>;

export enum ActionTypes {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    LOGOUT = 'LOGOUT',
}

export type ActionBindings = {
    [ActionTypes.LOGIN]: (form: IFormLogin) => Promise<void>;
    [ActionTypes.REGISTER]: (form: IFormRegister) => Promise<void>;
    [ActionTypes.REFRESH_TOKEN]: () => Promise<void>;
    [ActionTypes.LOGOUT]: () => void;
};
