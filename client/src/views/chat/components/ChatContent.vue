<template>
    <v-card style='height: 100%'>
        <h3>Content</h3>
    </v-card>
</template>

<script lang='ts'>
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component
export default class ChatContent extends Vue {

    @Watch('$route',  { immediate: true, deep: true })
    logRouteParams() {
        console.log(this.$route.params.id);
    }
}
</script>