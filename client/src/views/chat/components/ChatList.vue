<template>
    <v-card class="chat-list">
        <div
            :class="{ 'bg-lightest-grey': isActive(conversation.id) }"
            class="chat-list-item pt-4 pb-3 px-2"
            v-for="conversation of conversations"
            :key="conversation.id"
        >
            <chat-list-item :conversation="conversation" />
        </div>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ChatListItem from '@/views/chat/components/ChatListItem.vue';
import { ConversationWebsocket } from '@/types/resources/websocket';
@Component({
    components: { ChatListItem },
})
export default class ChatList extends Vue {
    @Prop() conversations!: Array<ConversationWebsocket & { isGroup: boolean }>;

    isActive(id: string): boolean {
        return this.$route.params.id === id;
    }
}
</script>

<style lang="scss" scoped>
.chat-list-item {
    transition: all 0.15s;
    border-bottom: $sn-main-lightest-grey 1px solid;
    &:hover {
        background-color: $sn-main-light-grey !important;
    }
}

.chat-list {
    color: #00000000 !important;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    @include scrollbar($sn-main-grey);
}
</style>
