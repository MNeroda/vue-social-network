<template>
    <v-dialog
        class="d-flex justify-center"
        v-model="dialog"
        persistent
        @click:outside="$emit('dialogClose')"
        width="900"
    >
        <v-card class="py-5 px-6" style='gap: 20px; position: relative; min-height: 500px'>
            <div class='arrow__left' @click="chooseNextPhoto(-1)"></div>
            <photo-component
                class='mx-5'
                :user-id="userId"
                :photo="photo"
                :key='photo._id'
                :ratio='1'
            ></photo-component>
            <div class='arrow__right' @click="chooseNextPhoto(1)"></div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { PhotoInfo } from '@/types/resources/photos';
import PhotoComponent from '@/components/PhotoComponent.vue';
@Component({
    components: { PhotoComponent },
})
export default class SliderPhoto extends Vue {
    @Model('dialogClose') dialog!: boolean;
    @Prop() photos!: PhotoInfo[];
    @Prop() initializeIndex!: number;
    @Prop() userId!: string;

    indexOpenedPhoto = 0;

    chooseNextPhoto(num: number) {
        this.indexOpenedPhoto =
            (this.indexOpenedPhoto + num) % this.photos.length;
        if (this.indexOpenedPhoto < 0)
            this.indexOpenedPhoto = this.photos.length - 1;
    }

    get photo(): PhotoInfo {
        console.log('ph ', this.photos[this.indexOpenedPhoto]);
        return this.photos[this.indexOpenedPhoto];
    }

    mounted(): void {
        this.indexOpenedPhoto = this.initializeIndex;
    }
}
</script>

<style scoped lang="scss">
.arrow {
    &__left {
        top: 50%;
        position: absolute;
        left: 20px;
        &:after {
            transform: rotate(135deg) scale(5);
            margin-left: 4px;

        }
    }
    &__right {
        top: 50%;
        position: absolute;
        right: 20px;
        &:after {
            transform: rotate(-45deg) scale(5);
            margin-right: 4px;

        }
    }
    &__right, &__left {
        &:after {
            display: inline-block;
            position: relative;
            content: "";
            top: -2px;
            right: 0;
            width: 6px;
            height: 6px;
            border-right: 2px solid rgba(0,0,0,.2);
            border-bottom: 2px solid rgba(0,0,0,.2);
        }
    }
}
</style>
