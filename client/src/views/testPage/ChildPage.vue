<template>
    <div>
        <p>{{commentBody}} @{{rating}}</p>
        <button class='bg-orange white--text py-3 px-5' style='border-radius: 6px' @click='upvote'>Upvote</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ChildPage extends Vue {
    @Prop() commentBody!: string
    rating = 0

    async upvote() {
        setTimeout(() => {
            this.rating++
        }, 1000)
    }
}
</script>

<style scoped lang="scss">

</style>