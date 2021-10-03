export interface FindUserWebsocket {
    id: string;
    email: string;
    name: string;
    isHaveAvatar: boolean;
}

export interface FriendsWebsocket {
    id: string;
    name: string;
    isHaveAvatar: boolean;
}

export interface MessagesWebsocket {
    date: string;
    senderId: string;
    value: string;
    _id: string;
}

export interface ConversationWebsocket {
    id: string;
    isHaveAvatar: boolean;
    linkTo: string;
    name: string;
}

export interface SerializeConversations {
    id: string;
    groupName?: string;
    members: Array<{
        id: string;
        isHaveAvatar: boolean;
        name: string;
    }>;
}
