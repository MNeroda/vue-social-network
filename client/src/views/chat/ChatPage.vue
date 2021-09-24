<template>
    <div class="view bg-light-grey">
        <div class="tmp d-flex pl-2 pr-4 pb-1" style="gap: 15px">
            <chat-list style="flex: 2"></chat-list>
            <chat-content style="flex: 14"></chat-content>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChatList from '@/views/chat/components/ChatList.vue';
import ChatContent from '@/views/chat/components/ChatContent.vue';

@Component({
    components: { ChatContent, ChatList },
})
export default class ChatPage extends Vue {
    /*    @Watch('$route',  { immediate: true, deep: true })
    logRouteParams() {
        console.log(this.$route.params.id);
    }*/
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
