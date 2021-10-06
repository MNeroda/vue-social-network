<template>
    <v-card
        class="d-flex flex-column align-center justify-center pa-4"
        style="gap: 10px"
    >
        <v-skeleton-loader
            v-if="loading"
            width="100%"
            type="image"
        ></v-skeleton-loader>
        <img
            v-else-if="imagePreview"
            :src="imagePreview"
            style="max-width: 100%; border-radius: 10px"
        />
        <v-img
            v-else
            :src="imageURL"
            style="max-width: 100%; border-radius: 10px"
        >
            <template v-slot:placeholder>
                <v-skeleton-loader
                    width="100%"
                    type="image"
                ></v-skeleton-loader>
            </template>
        </v-img>

        <div v-if="isOwnerPage">
            <input
                style="display: none"
                type="file"
                ref="file"
                @change="changeImageHandler"
                :accept="['.jpg']"
            />
            <div
                class="upload-image-label"
                style="font-size: 14px"
                @click="clickOnInputImage"
            >
                <v-icon>mdi-download</v-icon>
                Загрузить изображение
            </div>
        </div>

        <div v-else class="d-flex flex-column mt-2" style="gap: 10px">
            <v-btn
                class="bg-blue white--text"
                style="text-transform: none"
                @click="sendMessage"
                >Написать сообщение</v-btn
            >
            <v-btn
                class="bg-blue white--text"
                style="text-transform: none"
                @click="addToFriends"
                >Добавить в друзья</v-btn
            >
        </div>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FileResource } from '@/recources/FileResource';
import { GenericEvent, VueElementClickable } from '@/types/events';
import { emitSocketsEvent } from '@/types/socketEvents';

const fileResource = new FileResource();
@Component
export default class AvatarUser extends Vue {
    @Prop({ default: false }) isHaveAvatar!: boolean;
    @Prop({ default: false }) isOwnerPage!: boolean;

    userId = '';
    loading = true;
    uploadImage: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;

    imageURL = '';
    downloadedImagePreview: string | ArrayBuffer | null = null;
    clickOnInputImage(): void {
        const ref: VueElementClickable = this.$refs.file as VueElementClickable;
        ref.click();
    }

    changeImageHandler(e: GenericEvent<HTMLInputElement>): void {
        if (!e.target?.files?.length) {
            this.uploadImage = null;
        } else {
            this.uploadImage = e.target.files[0];
            this.loading = false;
            fileResource.uploadAvatar(this.uploadImage);
        }
    }

    @Watch('uploadImage', { deep: true })
    async changeImagePreview(): Promise<void> {
        if (this.uploadImage) {
            const reader = new FileReader();
            reader.readAsDataURL(this.uploadImage as Blob);
            reader.onload = () => {
                this.imagePreview = reader.result;
                this.loading = false;
            };
        }
    }

    async mounted(): Promise<void> {
        if (this.isOwnerPage) this.userId = this.$store.state.userId;
        else this.userId = this.$route.params.id;

        this.imageURL = await fileResource.getUserAvatar(
            this.userId,
            this.isHaveAvatar
        );
        this.loading = false;
    }

    sendMessage(): void {
        this.$router.push(`/chat/${this.userId}`);
    }

    addToFriends(): void {
        this.$socket.emit(
            emitSocketsEvent.ADD_TO_FRIENDS,
            this.$route.params.id
        );
    }
}
</script>

<style lang="scss" scoped>
.upload-image-label {
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    &:hover {
        transform: scale(1.05);
    }
}
</style>
