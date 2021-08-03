import { BaseResource } from '@/recources/BaseResource';
import { IFormLogin, IRegisterUser } from '@/types/user';

export class AuthResource extends BaseResource {
    constructor() {
        super('/api/auth');
    }

    registerNewUser(form: IRegisterUser): Promise<any> {
        return this.axios.post('/register', {
            ...form,
        });
    }

    login(form: IFormLogin): Promise<any> {
        return this.axios.post('/login', form);
    }

    checkAuth(token: string) {
        return this.axios.get('/check-auth', {headers: {
                authorization: `Bearer ${token}`
            }}).then((res) => res.data.login);
    }
}
