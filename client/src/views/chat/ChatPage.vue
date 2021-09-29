<template>
    <div class="view bg-light-grey">
        <div class="tmp d-flex pl-2 pr-4 pb-1" style="gap: 15px">
            <chat-list style="flex: 1"></chat-list>
            <chat-content
                :isNewDialog="isNewDialog"
                :dialogId='dialogId'
                style="flex: 7"
            ></chat-content>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ChatList from '@/views/chat/components/ChatList.vue';
import ChatContent from '@/views/chat/components/ChatContent.vue';
import { UserResource } from '@/recources/UserResource';
import { onSocketsEvent } from '@/types/socketEvents';

const userResource = new UserResource();
@Component({
    components: { ChatContent, ChatList },
})
export default class ChatPage extends Vue {
    listDialogs: string[] = [];
    isNewDialog = true;
    dialogId = '';
    conversationArr: any[] = []

    get listConversations() {
        return this.conversationArr.map((conversation: any) => {
            if (conversation.members.length === 1) {
                return {
                    name: conversation.members[0].name,
                    linkTo: conversation.members[0].id,

                }
            } else {
                //todo сделать логику для групп
                //Вероятнее всего поменяется только linkTo: conversation.members[0].id
                //на linkTo: conversation.id
            }
        })
    }

    async mounted() {
        this.conversationArr = await userResource.getConversation();
        console.log('car ', this.conversationArr);
        let indexConversation = -1;

        this.conversationArr.map((conversation: any, index: number) => {
            if (conversation.id === this.$route.params.id) {
                indexConversation = index
            }
            if(conversation.members.map((member: any) => member.id).includes(this.$route.params.id)) {
                indexConversation = index
            }
        })

        if (indexConversation > -1) {
            this.isNewDialog = false
            this.dialogId = this.conversationArr[indexConversation].id
        } else {
            this.isNewDialog = true
            this.dialogId = this.$route.params.id
        }

        console.log('flag ', this.dialogId);


        this.$socket.on(onSocketsEvent.NEW_DIALOG, (data: any) => {
            console.log('dialog ', data);
            this.isNewDialog = false;
            this.dialogId = data._id
        });

        this.$socket.on(onSocketsEvent.NEW_MESSAGE, (data: any) => {
            console.log('new mess ', data);
        })
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
