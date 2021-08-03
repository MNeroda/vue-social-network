import { MutationTree } from 'vuex';
import { IFormLogin, IRegisterUser } from '@/types/user';

export interface AppState {
    token: string;
    userId: string;
    errors: Array<string>;
    info: Array<string>;
}

export enum MutationTypes {
    SET_TOKEN = 'SET_TOKEN',
    SET_USER_ID = 'SET_USER_ID',
    SET_ERRORS = 'SET_ERRORS',
    SET_INFO = 'SET_INFO',
}

export type Mutations<S = AppState> = {
    [MutationTypes.SET_TOKEN]: (state: S, token: string) => void;
    [MutationTypes.SET_USER_ID]: (state: S, userId: string) => void;
    [MutationTypes.SET_ERRORS]: (state: S, errors: Array<string>) => void;
    [MutationTypes.SET_INFO]: (state: S, info: Array<string>) => void;
} & MutationTree<AppState>;

export enum ActionTypes {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    SET_TOKEN_TO_LOCAL_STORAGE = 'SET_USER_TO_LOCAL_STORAGE',

}

export type ActionBindings = {
    [ActionTypes.LOGIN]: (form: IFormLogin) => Promise<void>;
    [ActionTypes.REGISTER]: (form: IRegisterUser) => Promise<void>;
    [ActionTypes.SET_TOKEN_TO_LOCAL_STORAGE]: (token: string) => void;
};
