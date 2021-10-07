<template>
    <v-img
        v-if="urlPhoto"
        :src="urlPhoto"
        :aspect-ratio="ratio"
        :width="width"
        style='border-radius: 6px'
        @click='$emit("click")'
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { PhotoInfo } from '@/types/resources/photos';
import { FileResource } from '@/recources/FileResource';

const fileResource = new FileResource()
@Component
export default class PhotoComponent extends Vue {
    @Prop () photo!: PhotoInfo
    @Prop () userId!: string
    @Prop() width!: string
    @Prop() ratio!: number
    urlPhoto = ''

    async mounted(): Promise<void> {
        this.urlPhoto = await fileResource.getUserPhoto(this.userId, this.photo.name);
    }
}
</script>

<style scoped lang="scss">
</style>