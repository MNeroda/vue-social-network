<template>
    <div class="pa-4">
        <h1 v-if="!$route.params.id">CHOOSE DIALOG</h1>
        <h1 v-else-if="!isCorrectUrl">INCORRECT URL</h1>
        <h1 v-else-if="loading">LOADING</h1>
        <div
            v-else
            v-for="message of messages"
            :key="message._id"
            class="d-flex flex-column"
        >
            <div>
                <div
                    class="mt-2"
                    :class="{
                        'my-message': isMyMessage(message.senderId),
                        'friend-message': !isMyMessage(message.senderId),
                    }"
                >
                    {{ message.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { MessagesWebsocket } from '@/types/resources/websocket';

@Component
export default class ChatMessages extends Vue {
    @Prop() loading!: boolean;
    @Prop() isCorrectUrl!: boolean;
    @Prop() messages!: MessagesWebsocket[];

    isMyMessage(messageId: string): boolean {
        return messageId === this.$store.state.userId;
    }
}
</script>

<style scoped lang="scss">
* {
    color: black;
}

.my-message {
    min-width: 300px;
    max-width: 800px;
    margin-right: 10px;
    float: right;
    background: $sn-green-message;
    padding: 1em 1.5em;
    border-radius: 10px 10px 0 10px;
    position: relative;
    line-height: 1.5em;

    &:after {
        content: '';
        position: absolute;
        left: 100%;
        bottom: 0.1em;
        width: 1.8em;
        height: 1.8em;
        border: 0.5em solid white;
        border-radius: 50%;
        background: white;
    }
    &:before {
        content: '';
        position: absolute;
        left: 100%;
        bottom: 0;
        width: 1.8em;
        border-radius: 50%;
        border-top: none;
        height: 0.9em;
        border-radius: 0 0 50% 50% / 0 0 100% 100%;
        background: $sn-green-message;
        border-color: silver;
        margin-left: -0.9em;
    }
}

.friend-message {
    margin-left: 10px;
    width: 500px;
    margin-right: 10px;
    background: $sn-main-grey;
    padding: 1em 1.5em;
    border-radius: 10px 10px 10px 0;
    position: relative;
    line-height: 1.5em;

    &:after {
        content: '';
        position: absolute;
        right: 100%;
        bottom: 0.1em;
        width: 1.8em;
        height: 1.8em;
        border: 0.5em solid white;
        border-radius: 50%;
        background: white;
    }
    &:before {
        content: '';
        position: absolute;
        right: 100%;
        bottom: 0;
        width: 1.8em;
        border-radius: 50%;
        border-top: none;
        height: 0.9em;
        border-radius: 0 0 50% 50% / 0 0 100% 100%;
        background: $sn-main-grey;
        border-color: $sn-main-grey;
        margin-right: -0.9em;
    }
}
</style>
