<template>
    <div class="bg-light-grey" style="height: 100vh">
        <v-container class="mx-auto mt-10" style="max-width: 700px">
            <v-card-title class="col-blue py-0 pr-3">
                {{ title }}
            </v-card-title>
            <v-card class="bg-blue white--text py-5 px-8">
                <router-view />
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class UnauthorizedLayout extends Vue {
    get title(): string {
        return this.$route.path === '/login'
            ? 'Авторизация'
            : this.$route.path === '/register'
            ? 'Регистрация'
            : '';
    }
}
</script>
