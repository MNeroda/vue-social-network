<template>
    <v-card>
        <chat-messages class="messages-block" />

        <div class="send-block">
            <v-text-field placeholder="message"></v-text-field>
        </div>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import ChatMessages from '@/views/chat/components/ChatMessages.vue';
@Component({
    components: { ChatMessages },
})
export default class ChatContent extends Vue {
    @Watch('$route', { immediate: true, deep: true })
    logRouteParams() {
        console.log(this.$route.params.id);
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
