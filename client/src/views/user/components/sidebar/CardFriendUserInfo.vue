<template>
    <div
        class="d-flex flex-column"
        style="cursor: pointer"
        @click="moveToUserPage"
    >
        <v-img
            v-if="urlAvatar"
            :src="urlAvatar"
            :aspect-ratio="1"
            width="64"
            style="border-radius: 50%"
            class="image-to-circle"
        />
        <v-icon v-else class="image-to-circle" size="64"
            >mdi-account-circle</v-icon
        >
        <span class="clip-text text-center mt-6">
            {{ friend.name }}
        </span>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FileResource } from '@/recources/FileResource';

const fileResource = new FileResource();
@Component
export default class CardFriendUserInfo extends Vue {
    @Prop() friend!: { name: string; isHaveAvatar: boolean; id: string };
    urlAvatar = '';

    moveToUserPage(): void {
        this.$router.push(`/user/${this.friend.id}`);
    }

    async mounted(): Promise<void> {
        if (this.friend.isHaveAvatar) {
            this.urlAvatar = await fileResource.getUserAvatar(this.friend.id);
        }
    }
}
</script>

<style scoped lang="scss"></style>
