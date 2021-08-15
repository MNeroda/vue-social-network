import store from '@/store';
import { ActionTypes } from '@/store/types';

interface IDecrypted {
    exp: number;
    iat: number;
}

export interface IDecryptedToken extends IDecrypted{
    userId: string
}

export function getDataFromJWT<T extends IDecryptedToken>(token: string): T & void {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        store.dispatch(ActionTypes.LOGOUT);
    }
}
