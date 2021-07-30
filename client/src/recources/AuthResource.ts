import { BaseResource } from '@/recources/BaseResource';
import { IRegisterUser } from '@/types/user';

export class AuthResource extends BaseResource {
    constructor() {
        super('/api/auth');
    }

    registerNewUser(form: IRegisterUser): Promise<IRegisterUser> {
        return this.axios.post('/register', {
            ...form,
        }).then(res => res.data);
    }
}
