import { BaseResource } from '@/recources/BaseResource';
import store from '@/store';

export class UserResource extends BaseResource {
    constructor() {
        super('/api/user/');
    }

    async getUserInfo(id: string) {
        return this.axios
            .get('user-info', {
                params: { id },
            })
            .then((res) => res.data);
    }

    async getConversation() {
        return this.axios.get('get-conversations', {
            headers: {
                ['access-token']: store.state.token,
            },
        });
    }
}
