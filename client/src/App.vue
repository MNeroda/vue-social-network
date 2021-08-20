<template>
    <v-app>
        <div v-if='loading'></div>
        <component v-else :is="layout"></component>
    </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { default as AuthorizedLayout } from '@/layouts/AuthorizedLayout.vue';
import { default as UnauthorizedLayout } from '@/layouts/UnauthorizedLayout.vue';
import { ActionTypes } from '@/store/types';

@Component({
    components: {
        AuthorizedLayout,
        UnauthorizedLayout,
    },
})
export default class App extends Vue {
    loading = true
    get layout(): string {
        return this.$route.meta?.layout || 'authorized-layout';
    }

    async mounted() {
        if (localStorage.getItem('token')) {
            await this.$store.dispatch(ActionTypes.REFRESH_TOKEN)
        }
        this.loading = false
    }
}
</script>

<style>
@import '~normalize.css/normalize.css';
@import 'styles/index.css';
</style>
