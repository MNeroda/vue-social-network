<template>
    <v-card>
        <chat-messages class="messages-block" />

        <v-form
            v-model="isValid"
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
                ></v-text-field>
            </div>
            <v-btn depressed class="col-blue" @click="sendMessage">
                <v-icon size="38"> mdi-send-circle </v-icon>
            </v-btn>
        </v-form>
    </v-card>
</template>

<script lang="ts">
import { Component, Model, ModelSync, Prop, Vue } from 'vue-property-decorator';
import ChatMessages from '@/views/chat/components/ChatMessages.vue';
import { validators } from '@/modules/validators';
import { emitSocketsEvent } from '@/types/socketEvents';

@Component({
    components: { ChatMessages },
})
export default class ChatContent extends Vue {
    @Prop() isNewDialog!: boolean
    @Prop() dialogId!: string
    textMessage = '';

    required = [validators.required('Необходимо ввести сообщение')];
    isValid = true;

    sendMessage() {
        if (!this.textMessage) {
            return
        }
        if (this.isNewDialog) {
            this.$socket.emit(emitSocketsEvent.SEND_MESSAGE_IN_NEW_DIALOG, {message: this.textMessage, toId: this.dialogId})
        } else {
            this.$socket.emit(emitSocketsEvent.SEND_MESSAGE_IN_EXIST_DIALOG, {message: this.textMessage, toId: this.dialogId})
        }
    }
}
</script>

<style lang="scss" scoped>
.messages-block {
    overflow: auto;
    height: calc(100% - #{$block-send-message-height});

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
