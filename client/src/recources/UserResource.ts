import { BaseResource } from '@/recources/BaseResource';

export class UserResource extends BaseResource {
    constructor() {
        super('/api/user/');
    }

    async getUserInfo(id: string) {
        return this.axios.get('user-info', {
            params: { id },
        }).then(res => res.data);
    }
}
