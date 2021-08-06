import { MutationTree } from 'vuex';
import { IFormLogin, IFormRegister } from '@/types/user';

export interface AppState {
    token: string;
    userId: string;
    errors: Array<string>;
    info: Array<string>;
}

export enum MutationTypes {
    SET_TOKEN = 'SET_TOKEN',
}

export type Mutations<S = AppState> = {
    [MutationTypes.SET_TOKEN]: (state: S, token: string) => void;
} & MutationTree<AppState>;

export enum ActionTypes {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    SET_TOKEN_TO_LOCAL_STORAGE = 'SET_USER_TO_LOCAL_STORAGE',
}

export type ActionBindings = {
    [ActionTypes.LOGIN]: (form: IFormLogin) => Promise<void>;
    [ActionTypes.REGISTER]: (form: IFormRegister) => Promise<void>;
    [ActionTypes.SET_TOKEN_TO_LOCAL_STORAGE]: (token: string) => void;
};
