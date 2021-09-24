import { BaseResource } from '@/recources/BaseResource';
import store from '@/store';
import { IUserInfo } from '@/types/resources/userResource';

export class UserResource extends BaseResource {
    constructor() {
        super('/api/user/');
    }

    async getUserInfo(id: string): Promise<IUserInfo> {
        return this.axios
            .get('user-info', {
                params: { id },
            })
            .then((res) => res.data);
    }
}
