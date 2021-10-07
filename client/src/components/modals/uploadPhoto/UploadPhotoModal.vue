<template>
    <sn-modal
        v-if="dialog"
        :dialog="dialog"
        @dialogClose="closeDialogHandler"
        title="Загрузить фотографию"
    >

        <div class='mx-auto mt-4' style='width: fit-content'>
            <img
                class='mx-auto'
                v-if="imagePreview"
                :src="imagePreview"
                style="max-width: 100%; border-radius: 10px"
            />

            <input
                style="display: none"
                type="file"
                ref="file"
                @change="changeImageHandler"
                :accept="['.jpg']"
            />
            <div
                class="upload-image-label mx-auto mt-3"
                style="font-size: 18px; width: fit-content"
                @click="clickOnInputImage"
            >
                <v-icon>mdi-download</v-icon>
                <span>{{imagePreview ? 'Выбрать другое': 'Загрузить изображение' }}</span>
            </div>

            <div class='mx-auto pt-4' style='width: fit-content'>
                <v-btn v-if='imagePreview' class='bg-blue white--text' @click='uploadNewImage'>Сохранить изображение</v-btn>
            </div>


        </div>


    </sn-modal>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'vue-property-decorator';
import SnModal from '@/components/SnModal.vue';
import { GenericEvent, VueElementClickable } from '@/types/events';
import { FileResource } from '@/recources/FileResource';

const fileResource = new FileResource()
@Component({
    components: { SnModal }
})
export default class UploadPhotoModal extends Vue {
    @Model('dialogClose') dialog!: boolean;
    imagePreview: string | ArrayBuffer | null = null;
    loading = true
    uploadImage: File | null = null;

    closeDialogHandler(): void {
        this.$emit('dialogClose', false);
    }

    changeImageHandler(e: GenericEvent<HTMLInputElement>): void {
        if (!e.target?.files?.length) {
            this.uploadImage = null;
        } else {
            this.uploadImage = e.target.files[0];
            this.loading = false;
        }
    }

    async uploadNewImage() {
        if (this.uploadImage) {
            await fileResource.uploadPhoto(this.uploadImage);
            this.closeDialogHandler()
            this.$emit('updatePhotos')
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

    clickOnInputImage(): void {
        const ref: VueElementClickable = this.$refs.file as VueElementClickable;
        ref.click();
    }
}
</script>

<style scoped lang="scss">
.upload-image-label {
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    &:hover {
        transform: scale(1.05);
    }
}
</style>