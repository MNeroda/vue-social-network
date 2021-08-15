<template>
    <v-card>
        <h1>Avatar</h1>
    </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator';
import { FileResource } from '@/recources/FileResource';

const fileResource = new FileResource()
@Component
export default class AvatarUser extends Vue {
    @Watch('$store.state.userId', {deep: true})
    async watcher() {
        const data = await fileResource.getUserAvatar(this.$store.state.userId)
    }
}
</script>