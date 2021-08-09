<template>
    <v-app>
        <component :is="layout"> </component>
    </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
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
    get layout(): string {
        return this.$route.meta?.layout || 'authorized-layout';
    }
}
</script>

<style>
@import '~normalize.css/normalize.css';
@import 'styles/index.css';
</style>
