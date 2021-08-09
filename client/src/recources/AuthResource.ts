import { BaseResource } from '@/recources/BaseResource';
import { IFormLogin, IFormRegister } from '@/types/user';

interface IRegister extends IFormRegister {
    fingerPrint: string;
}
interface ILogin extends IFormLogin {
    fingerPrint: string;
}

export class AuthResource extends BaseResource {
    constructor() {
        super('/api/auth');
    }

    registerNewUser(form: IRegister): Promise<any> {
        return this.axios.post('/register', {
            ...form,
        });
    }

    login(form: ILogin): Promise<any> {
        return this.axios.post('/login', form);
    }

    refreshToken(fingerPrint: string): Promise<any> {
        return this.axios.get('/refresh-token', {
            params: {
                fingerPrint,
            },
        });
    }

    logout(): Promise<any> {
        return this.axios.get('/logout');
    }
}
