<template>
    <v-card class='px-8 py-6'>
        <template v-if='loading'>Загрузка...</template>
        <template v-else>
            <div class='d-flex justify-space-between mb-5'>
                <div>Фотографии</div>
                <v-btn v-if='isOwnerPage' class='col-blue bg-white' depressed @click='createUploadPhotoModal'>
                    <v-icon class='mr-1 col-blue'>mdi-camera</v-icon>
                    Добавить фото
                </v-btn>
            </div>
            <list-photos :photos='photos' :userId='userId'></list-photos>
        </template>

        <upload-photo-modal
            v-if='isShowUploadPhotoModal && isOwnerPage'
            v-model='isShowUploadPhotoModal'
            @updatePhotos='updatePhotos'
        ></upload-photo-modal>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import UploadPhotoModal from '@/components/modals/uploadPhoto/UploadPhotoModal.vue';
import { FileResource } from '@/recources/FileResource';
import { PhotoInfo } from '@/types/resources/photos';
import ListPhotos from '@/views/user/components/main-content/photos/ListPhotos.vue';

const fileResource = new FileResource()
@Component({
    components: { ListPhotos, UploadPhotoModal }
})
export default class PhotoUser extends Vue {
    @Prop() userName!: string
    @Prop() userId!: string
    @Prop() isOwnerPage!: boolean

    loading = true
    isShowUploadPhotoModal = false;
    photos: PhotoInfo[] = []

    createUploadPhotoModal() {
        this.isShowUploadPhotoModal = true;
    }

    async updatePhotos(): Promise<void> {
        this.photos = await fileResource.getListPhotos(this.userId)
    }

    async mounted(): Promise<void> {
        this.photos = await fileResource.getListPhotos(this.userId)
        this.loading = false
    }
}
</script>

<style scoped lang="scss">

</style>