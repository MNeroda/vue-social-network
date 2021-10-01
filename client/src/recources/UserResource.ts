import { BaseResource } from '@/recources/BaseResource';
import store from '@/store';
import { IUserInfo } from '@/types/resources/userResource';
import { FriendsWebsocket } from '@/types/resources/websocket';

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

    async getConversation(): Promise<any> {
        return this.axios
            .get('conversations')
            .then((res) => res.data.conversationArr);
    }

    async getMessagesByChatId(id: string): Promise<any> {
        return this.axios.get('messages-by-id', {
            params: { id },
        });
    }

    async getFriendsListById(id: string): Promise<any> {
        return this.axios
            .get('friends-list', {
                params: { id },
            })
            .then((res) => res.data);
    }

    async getFriendsRequest(): Promise<any> {
        return this.axios.get('friends-request').then((res) => res.data);
    }
}
