<template>
    <child-page :comment-body='data'/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ChildPage from '@/views/testPage/ChildPage.vue';
@Component({
    components: { ChildPage }
})
export default class RelativePage extends Vue {
    data = 'test'
}
</script>

<style scoped lang="scss">

</style>