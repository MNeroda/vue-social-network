<template>
    <div class="d-flex" style="gap: 20px; width: fit-content">
        <template v-for="(photo, idx) of photos">
            <photo-component
                @click="openSlider(idx)"
                v-if="idx < 4"
                :key="photo._id"
                :user-id="userId"
                width="256"
                :ratio='1'
                :photo="photo"
            ></photo-component>
        </template>
        <slider-photo
            v-if="isSliderVisible"
            v-model="isSliderVisible"
            :photos="photos"
            :userId='userId'
            :indexOpenedPhoto="indexPhotoOnSlider"
            @dialogClose="closeSlider"
            :initializeIndex="indexPhotoOnSlider"
        ></slider-photo>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { PhotoInfo } from '@/types/resources/photos';
import SliderPhoto from '@/views/user/components/main-content/photos/SliderPhoto.vue';
import PhotoComponent from '@/components/PhotoComponent.vue';
@Component({
    components: { PhotoComponent, SliderPhoto },
})
export default class ListPhotos extends Vue {
    @Prop() photos!: PhotoInfo[];
    @Prop() userId!: string;
    isSliderVisible = false;
    indexPhotoOnSlider = 0;

    openSlider(idx: number) {
        console.log('opSl ', idx);
        this.indexPhotoOnSlider = idx;
        this.isSliderVisible = true;
    }

    closeSlider() {
        this.isSliderVisible = false;
    }
}
</script>

<style scoped lang="scss"></style>
