<template>
    <div class="view bg-light-grey">
        <div class="d-flex pt-3 pl-2 pr-4 pb-1" style="gap: 15px">
            <div style="flex: 2">
                <chat-list></chat-list>
            </div>
            <div style="flex: 14">
                <chat-content></chat-content>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserResource } from '@/recources/UserResource';
import ChatList from '@/views/chat/components/ChatList.vue';
import ChatContent from '@/views/chat/components/ChatContent.vue';

const userResource = new UserResource();
@Component({
    components: { ChatContent, ChatList },
})
export default class ChatPage extends Vue {
    /*    @Watch('$route',  { immediate: true, deep: true })
    logRouteParams() {
        console.log(this.$route.params.id);
    }*/

    async mounted() {
        const data = await userResource.getConversation();
    }
}
</script>

<style lang="scss" scoped>
.view {
    position: absolute;
    top: $header-height;
}
</style>
