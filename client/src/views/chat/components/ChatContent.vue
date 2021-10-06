<template>
    <v-card>
        <chat-info :userInfo="userInfo" :isGroup="isGroup" />
        <chat-messages
            :loading="loading"
            :isCorrectUrl="isCorrectUrl"
            :isNewDialog="isNewDialog"
            :messages="messages"
            class="messages-block"
        />

        <v-form
            v-if="isVisibleForm"
            class="send-block d-flex align-center"
            style="gap: 15px"
            @submit.prevent
        >
            <div>
                <v-text-field
                    v-model="textMessage"
                    class="ml-4"
                    placeholder="Введите сообщение"
                    style="width: 500px"
                    :aria-autocomplete="false"
                ></v-text-field>
            </div>
            <v-btn depressed class="col-blue" @click="sendMessage">
                <v-icon size="38"> mdi-send-circle </v-icon>
            </v-btn>
        </v-form>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ChatMessages } from '@/views/chat/components';
import { emitSocketsEvent } from '@/types/socketEvents';
import { UserResource } from '@/recources/UserResource';
import ChatInfo from '@/views/chat/components/ChatInfo.vue';
import {
    ConversationWebsocket,
    MessagesWebsocket,
} from '@/types/resources/websocket';

const userResource = new UserResource();
@Component({
    components: { ChatInfo, ChatMessages },
})
export default class ChatContent extends Vue {
    @Prop() isNewDialog!: boolean;
    @Prop() isGroup!: boolean;
    @Prop() dialogId!: string;
    @Prop() userInfo!: ConversationWebsocket;
    @Prop() isCorrectUrl!: boolean;
    messages: MessagesWebsocket[] = [];
    textMessage = '';
    loading = true;

    get isVisibleForm(): boolean {
        return !!this.$route.params.id && this.isCorrectUrl && !this.loading;
    }

    sendMessage(): void {
        if (!this.textMessage) {
            return;
        }
        if (this.isNewDialog) {
            this.$socket.emit(emitSocketsEvent.SEND_MESSAGE_IN_NEW_DIALOG, {
                message: this.textMessage,
                toId: this.dialogId,
            });
        } else {
            this.$socket.emit(emitSocketsEvent.SEND_MESSAGE_IN_EXIST_DIALOG, {
                message: this.textMessage,
                toId: this.dialogId,
            });
        }
        this.textMessage = '';
    }

    pushMessage(newMessage: MessagesWebsocket): void {
        this.messages.push(newMessage);
    }

    async mounted(): Promise<void> {
        try {
            const res = await userResource.getMessagesByChatId(this.dialogId);
            this.loading = false;
            this.messages = res.data.messages;
        } catch (e) {
            this.loading = false;
            this.messages = [];
        }
        this.$emit('funcPushMessage', this.pushMessage);
    }
}
</script>

<style lang="scss" scoped>
.messages-block {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - #{$block-send-message-height} - #{$dialog-info-height});

    @include scrollbar($sn-main-grey);
}

.send-block {
    position: absolute;
    border-top: 3px solid $sn-main-grey;
    background-color: white;
    bottom: 0;
    left: 0;
    right: 0;
    height: $block-send-message-height;
}
</style>
