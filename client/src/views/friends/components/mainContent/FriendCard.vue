<template>
    <div class="d-flex" style="gap: 20px">
        <div style='cursor: pointer' @click='moveToUserPage'>
            <v-img
                v-if="urlAvatar"
                :src="urlAvatar"
                :aspect-ratio="1"
                width="100"
                style="border-radius: 50%"
                class="image-to-circle"
            />
            <div v-else style="width: 100px; height: 100px">
                <v-icon class="image-to-circle" size="118"
                    >mdi-account-circle</v-icon
                >
            </div>
        </div>

        <div class="d-flex flex-column mt-3">
            <h5 class="ml-2" style="font-size: 18px; cursor: pointer" @click='moveToUserPage'>
                {{ friend.name }}
            </h5>
            <div class="d-flex mt-4" style="gap: 10px">
                <span class="actions-friend-card col-blue" @click='moveToChat'
                    >Написать сообщение</span
                >
                <span class="actions-friend-card col-blue" @click='moveToUserPage'
                    >Открыть профиль</span
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FindUserWebsocket } from '@/types/resources/websocket';
import { FileResource } from '@/recources/FileResource';

const fileResource = new FileResource();
@Component
export default class FriendCard extends Vue {
    @Prop() friend!: FindUserWebsocket;
    urlAvatar = '';

    moveToUserPage() {
        this.$router.push(`/user/${this.friend.id}`)
    }

    moveToChat() {
        this.$router.push(`/chat/${this.friend.id}`)
    }

    async mounted() {
        if (this.friend.isHaveAvatar) {
            this.urlAvatar = await fileResource.getUserAvatar(this.friend.id);
        }
    }
}
</script>

<style scoped lang="scss">
.actions-friend-card {
    font-size: 12px;
    cursor: pointer;
    &:after {
        transition: all 0.2s;
        content: '';
        display: block;
        background-color: $sn-main-blue;
        height: 1px;
        opacity: 0;
    }

    &:hover {
        &:after {
            opacity: 1;
        }
    }
}
</style>
