<template>
    <div class="d-flex" style="gap: 10px; cursor: pointer" @click='moveToChat'>
        <div>
            <v-img
                v-if="urlAvatar"
                :src="urlAvatar"
                :aspect-ratio="1"
                width="50"
                style="border-radius: 50%"
                class="image-to-circle"
            />
            <div v-else style="width: 50px; height: 50px">
                <v-icon class="image-to-circle" size="59"
                >mdi-account-circle</v-icon
                >
            </div>
        </div>

        <div>
            <div class='ml-1' style='font-size: 17px'>{{conversation.name}}</div>
            <div class='last-message col-dark-grey' style='font-size: 14px'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, quidem?</div>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FileResource } from '@/recources/FileResource';

const fileResource = new FileResource()
@Component
export default class ChatListItem extends Vue {
    @Prop()conversation!: any
    urlAvatar = ''

    moveToChat() {
        if (this.conversation.id !== this.$route.params.id) {
            this.$router.push(`/chat/${this.conversation.id}`)
        }
    }

    async mounted() {
        if (this.conversation.isHaveAvatar) {
            this.urlAvatar = await fileResource.getUserAvatar(this.conversation.id);
        }
    }
}
</script>

<style scoped lang="scss">
* {
    color: black;
}

.last-message {
    @include word-hide-mixin(2)
}
</style>