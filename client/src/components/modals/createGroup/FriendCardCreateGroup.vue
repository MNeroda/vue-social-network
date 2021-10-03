<template>
    <div>
        <v-list-item-avatar>
            <v-img
                v-if="urlAvatar"
                :src="urlAvatar"
                :aspect-ratio="1"
                width="100"
                style="border-radius: 50%"
                class="image-to-circle"
            />
            <v-icon v-else class="image-to-circle" size="44"
            >mdi-account-circle</v-icon
            >
        </v-list-item-avatar>
        {{friend.name}}
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FileResource } from '@/recources/FileResource';

const fileResource = new FileResource()
@Component
export default class FriendCardCreateGroup extends Vue {
    @Prop() friend!: { name: string; isHaveAvatar: boolean, id: string }
    urlAvatar = ''
    async mounted(): Promise<void> {
        if (this.friend.isHaveAvatar) {
            this.urlAvatar = await fileResource.getUserAvatar(this.friend.id);
        }
    }
}
</script>

<style lang='css' scoped></style>