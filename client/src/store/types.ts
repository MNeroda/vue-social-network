import { MutationTree } from 'vuex';
import { IFormLogin, IFormRegister } from '@/types/user';
import { FriendsWebsocket } from '@/types/resources/websocket';

export interface AppState {
    token: string;
    prevTokenTimeout: ReturnType<typeof setTimeout> | undefined;
    userId: string;
    friendsList: { name: string; isHaveAvatar: boolean, id: string }[] | null;
}

export enum MutationTypes {
    SET_TOKEN = 'SET_TOKEN',
    SET_PREV_TOKEN_TIMEOUT = 'SET_RESET_TOKEN_TIMEOUT',
    SET_USER_ID = 'SET_USER_ID',
    SET_FRIENDS_LIST = 'SET_FRIENDS_LIST',
    PUSH_FRIENDS_LIST = 'PUSH_FRIENDS_LIST',
}

export type Mutations<S = AppState> = {
    [MutationTypes.SET_TOKEN]: (state: S, token: string) => void;
    [MutationTypes.SET_PREV_TOKEN_TIMEOUT]: (
        state: S,
        timeouts: ReturnType<typeof setTimeout> | undefined
    ) => void;
    [MutationTypes.SET_USER_ID]: (state: S, userId: string) => void;
    //Todo написать тип для friend
    [MutationTypes.SET_FRIENDS_LIST]: (
        state: S,
        friendsList: FriendsWebsocket[]
    ) => void;
    [MutationTypes.PUSH_FRIENDS_LIST]: (
        state: S,
        friend: FriendsWebsocket
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
