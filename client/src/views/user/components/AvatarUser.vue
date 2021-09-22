<template>
    <v-card
        class="d-flex flex-column align-center justify-center pa-4"
        style="gap: 10px"
    >
        <!--Firebase не дает скачивать файлы по url из-за CORS приходиться делать так:-->
        <!--<img :src='url'/>Из-за этого случаеся небольшой визуальный баг между получением url -->
        <!--по id пользователся и загрузкой изображения в img-->
        <v-skeleton-loader
            v-if="loading"
            width="100%"
            type="image"
        ></v-skeleton-loader>
        <img
            v-else-if="imagePreview"
            :src="imagePreview"
            style="max-width: 100%"
        />
        <v-img v-else :src="imageURL" style="max-width: 100%">
            <template v-slot:placeholder>
                <v-skeleton-loader
                    width="100%"
                    type="image"
                ></v-skeleton-loader>
            </template>
        </v-img>

        <div>
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
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { FileResource } from '@/recources/FileResource';
import { VueElementClickable, GenericEvent } from '@/types/events';

const fileResource = new FileResource();
@Component
export default class AvatarUser extends Vue {
    test() {
        this.loading = false;
    }
    loading = true;
    uploadImage: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;

    /*imageURL: File | null = '';*/
    imageURL: any = '';
    downloadedImagePreview: string | ArrayBuffer | null = null;
    clickOnInputImage() {
        const ref: VueElementClickable = this.$refs
            .file! as VueElementClickable;
        ref.click();
    }

    changeImageHandler(e: GenericEvent<HTMLInputElement>) {
        if (!e.target.files!.length) {
            this.uploadImage = null;
        } else {
            this.uploadImage = e.target.files![0];
            this.loading = false;
            fileResource.uploadAvatar(
                this.uploadImage,
                this.$store.state.userId
            );
        }
    }

    @Watch('uploadImage', { deep: true })
    async changeImagePreview() {
        if (this.uploadImage) {
            const reader = new FileReader();
            reader.readAsDataURL(this.uploadImage as Blob);
            reader.onload = () => {
                this.imagePreview = reader.result;
                this.loading = false;
            };
        }
    }

    /*    @Watch('imageURL', { deep: true })
    async changeDownloadedImagePreview() {
        if (this.imageURL) {
            const reader = new FileReader();
            reader.readAsDataURL(this.imageURL as Blob);
            reader.onload = () => {
                this.downloadedImagePreview = reader.result;
                this.loading = false
            };
        }
    }*/

    async mounted() {
        this.imageURL = await fileResource.getUserAvatar(
            this.$store.state.userId
        );
        this.loading = false;
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
