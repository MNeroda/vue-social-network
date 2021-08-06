import { Commit } from 'vuex';


export function getDataFromJWT(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
}

interface IDecryptedToken {
    exp: number
    iat: number
}

export function resetToken(decryptedToken: IDecryptedToken, callback: Commit) {
    setTimeout(callback, (decryptedToken.exp - decryptedToken.iat) * 1000)
}
