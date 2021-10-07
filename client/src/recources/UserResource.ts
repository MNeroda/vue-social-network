import { BaseResource } from '@/recources/BaseResource';
import { IFriendInfo, IUserInfo } from '@/types/resources/userResource';
import {
    FriendsWebsocket,
    MessagesWebsocket,
    SerializeConversations,
} from '@/types/resources/websocket';
import { AxiosResponse } from 'axios';

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

    async getConversation(): Promise<SerializeConversations[]> {
        return this.axios
            .get('conversations')
            .then((res) => res.data.conversationArr);
    }

    async getMessagesByChatId(
        id: string
    ): Promise<AxiosResponse<{ messages: MessagesWebsocket[] }>> {
        return this.axios.get('messages-by-id', {
            params: { id },
        });
    }

    async getFriendsListById(id: string): Promise<IFriendInfo[]> {
        return this.axios
            .get('friends-list', {
                params: { id },
            })
            .then((res) => res.data);
    }

    async getFriendsRequest(): Promise<FriendsWebsocket[]> {
        return this.axios.get('friends-request').then((res) => res.data);
    }
}
