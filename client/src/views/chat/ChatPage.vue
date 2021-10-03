<template>
    <div class="view bg-light-grey">
        <chat-skeleton-loader v-if="loading" />
        <div class="tmp d-flex pl-2 pr-4 pb-1" style="gap: 15px">
            <chat-list
                :conversations="listConversations"
                style="flex: 1"
            ></chat-list>
            <chat-content
                :userInfo="userInfoFromListConversation"
                :key="dialogId"
                :isNewDialog="isNewDialog"
                :dialogId="dialogId"
                :isCorrectUrl="isCorrectUrl"
                style="flex: 7"
                @funcPushMessage="updatePushMessageHandler"
            ></chat-content>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ChatList from '@/views/chat/components/ChatList.vue';
import ChatContent from '@/views/chat/components/ChatContent.vue';
import { UserResource } from '@/recources/UserResource';
import {
    onSocketsEvent,
    removeSocketListenersType,
} from '@/types/socketEvents';
import ChatSkeletonLoader from '@/views/chat/ChatSkeletonLoader.vue';
import {
    ConversationWebsocket,
    SerializeConversations,
} from '@/types/resources/websocket';
import { emptyFunction } from '@/modules/helpers/emptyFunction';
import { unsubscribeSocket } from '@/modules/helpers/unsubscribeSocket';

const userResource = new UserResource();
@Component({
    components: { ChatSkeletonLoader, ChatContent, ChatList },
})
export default class ChatPage extends Vue {
    listDialogs: string[] = [];
    isNewDialog = true;
    isCorrectUrl = true;
    dialogId = '';
    conversationArr: SerializeConversations[] = [];
    loading = true;
    userInfoInNewConversation: ConversationWebsocket | null = null;

    pushMessage: ((message: any) => void) | null = null;
    updatePushMessageHandler(func: (message: any) => void) {
        this.pushMessage = func;
    }

    get userInfoFromListConversation() {
        if (this.userInfoInNewConversation) {
            return this.userInfoInNewConversation;
        } else if (this.listConversations.length) {
            return this.listConversations.filter(
                (conversation) => conversation?.linkTo === this.$route.params.id
            )[0];
        }
        return null;
    }

    get listConversations(): ConversationWebsocket[] {
        return this.conversationArr.map((conversation) => {
            if (!conversation.groupName) {
                return {
                    name: conversation.members[0].name,
                    linkTo: conversation.members[0].id,
                    isHaveAvatar: conversation.members[0].isHaveAvatar,
                    id: conversation.members[0].id,
                };
            } else {
                //todo сделать логику для групп
                //Вероятнее всего поменяется только linkTo: conversation.members[0].id
                //на linkTo: conversation.id
                return {
                    name: conversation.groupName,
                    linkTo: conversation.id,
                    isHaveAvatar: false,
                    id: conversation.id,
                };
            }
        });
    }

    @Watch('$route.params.id')
    async changeConversationId(): Promise<void> {
        let indexConversation = -1;
        this.conversationArr.map((conversation: any, index: number) => {
            if (conversation.id === this.$route.params.id) {
                indexConversation = index;
            }
            if (
                conversation.members
                    .map((member: any) => member.id)
                    .includes(this.$route.params.id)
            ) {
                indexConversation = index;
            }
        });

        if (indexConversation > -1) {
            this.isNewDialog = false;
            this.dialogId = this.conversationArr[indexConversation].id;
            this.isCorrectUrl = true
        } else {
            const res = await userResource.getUserInfo(this.$route.params.id);
            //неверный url
            if (res.userNotExist) {
                this.isNewDialog = false;
                this.isCorrectUrl = false;
            } else {
                this.userInfoInNewConversation = {
                    id: res.id,
                    isHaveAvatar: res.isHaveAvatar,
                    linkTo: res.id,
                    name: res.name,
                };
                this.isNewDialog = true;
                this.isCorrectUrl = true;
                this.dialogId = this.$route.params.id;
            }
        }
    }

    removeSocketListeners: removeSocketListenersType = {
        [onSocketsEvent.NEW_DIALOG]: emptyFunction,
        [onSocketsEvent.NEW_MESSAGE]: emptyFunction,
    };

    async mounted(): Promise<void> {
        this.conversationArr = await userResource.getConversation();
        console.log('mCoArr ', this.conversationArr);
        this.loading = false;
        let indexConversation = -1;

        this.conversationArr.map((conversation: any, index: number) => {
            if (conversation.id === this.$route.params.id) {
                indexConversation = index;
            }
            if (
                conversation.members
                    .map((member: any) => member.id)
                    .includes(this.$route.params.id)
            ) {
                indexConversation = index;
            }
        });

        if (indexConversation > -1) {
            this.isNewDialog = false;
            this.dialogId = this.conversationArr[indexConversation].id;
        } else {
            const res = await userResource.getUserInfo(this.$route.params.id);
            //неверный url
            if (res.userNotExist) {
                this.isNewDialog = false;
                this.isCorrectUrl = false;
            } else {
                this.userInfoInNewConversation = {
                    id: res.id,
                    isHaveAvatar: res.isHaveAvatar,
                    linkTo: res.id,
                    name: res.name,
                };
                this.isNewDialog = true;
                this.dialogId = this.$route.params.id;
            }
        }

        this.removeSocketListeners.NEW_DIALOG = this.$socket.on(
            onSocketsEvent.NEW_DIALOG,
            (data: any) => {
                console.log('dialog ', data);
                this.isNewDialog = false;
                this.dialogId = data._id;
                this.conversationArr.unshift(data)

            }
        );

        this.removeSocketListeners.NEW_MESSAGE = this.$socket.on(
            onSocketsEvent.NEW_MESSAGE,
            (data: any) => {
                if (this.$route.params.id === data.toId) {
                    if (this.pushMessage) {
                        this.pushMessage(data);
                    } else {
                        throw new Error('Не передана функция pushMessage');
                    }
                }

                const idx = this.conversationArr.findIndex(
                    (conversation) => conversation.id === data.toId
                );
                this.conversationArr = [
                    this.conversationArr[idx],
                    ...[...this.conversationArr.slice(0, idx), ...this.conversationArr.slice(idx + 1)],
                ];
            }
        );
    }

    destroyed() {
        unsubscribeSocket(this.removeSocketListeners);
    }
}
</script>

<style lang="scss" scoped>
.view {
    position: absolute;
    top: $header-height;
    bottom: -100vh;
    left: 0;
    right: 0;
    background-color: $sn-main-light-grey !important;
    overflow: hidden;
}

.tmp {
    position: relative;
    height: 100%;
}
</style>
