<template>
    <div v-if='userInfo' class="chat-info bg-grey d-flex pa-2" style="gap: 10px; cursor: pointer">
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
                <v-icon class="image-to-circle" size="50"
                >mdi-account-circle</v-icon
                >
            </div>
        </div>

        <div class='ml-1 pt-1' style='font-size: 20px' @click='moveToUserPage'>{{userInfo.name}}</div>


    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FileResource } from '@/recources/FileResource';

const fileResource = new FileResource()
@Component
export default class ChatInfo extends Vue {
    @Prop() userInfo!: any

    urlAvatar = ''

    moveToUserPage() {
        this.$router.push(`/user/${this.userInfo.id}`)
    }

    async mounted() {
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