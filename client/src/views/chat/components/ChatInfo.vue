<template>
    <div
        v-if="userInfo"
        class="chat-info bg-light-grey d-flex pa-2"
        style="gap: 10px; cursor: pointer"
    >
        <div>
            <v-img
                v-if="urlAvatar"
                :src="urlAvatar"
                :aspect-ratio="1"
                width="40"
                style="border-radius: 50%"
                class="image-to-circle"
            />
            <div v-else style="width: 40px; height: 40px">
                <v-icon v-if="isGroup" class="image-to-circle" size="50"
                    >mdi-account-supervisor-circle</v-icon
                >
                <v-icon v-else class="image-to-circle" size="50"
                    >mdi-account-circle</v-icon
                >
            </div>
        </div>
        <div class="ml-1 pt-1" style="font-size: 20px" @click="chatAction">
            {{ userInfo.name }}
        </div>

        <edit-group-modal
            v-if="isShowGroupModal"
            v-model="isShowGroupModal"
            :userInfo='userInfo'
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FileResource } from '@/recources/FileResource';
import { ConversationWebsocket } from '@/types/resources/websocket';
import EditGroupModal from '@/views/chat/components/EditGroupModal.vue';

const fileResource = new FileResource();
@Component({
    components: { EditGroupModal },
})
export default class ChatInfo extends Vue {
    @Prop() isGroup!: boolean;
    @Prop() userInfo!: ConversationWebsocket;

    urlAvatar = '';

    isShowGroupModal = false;


    createGroupModal() {
        this.isShowGroupModal = true;
    }

    chatAction(): void {
        if (this.isGroup) {
            this.createGroupModal()
        } else {
            this.$router.push(`/user/${this.userInfo.id}`);
        }
    }

    async mounted(): Promise<void> {
        if (this.userInfo && this.userInfo.isHaveAvatar) {
            this.urlAvatar = await fileResource.getUserAvatar(this.userInfo.id);
        }
    }
}
</script>

<style scoped lang="scss">
.chat-info {
    height: $dialog-info-height;
}
</style>
