import store from '@/store';
import { ActionTypes } from '@/store/types';

interface IDecryptedToken {
    exp: number;
    iat: number;
}

export function getDataFromJWT(token: string): IDecryptedToken & void {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        store.dispatch(ActionTypes.LOGOUT);
    }
}
