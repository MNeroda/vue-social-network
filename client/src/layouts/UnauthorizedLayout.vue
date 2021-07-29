<template>
    <div class="background">
        <v-container class='mx-auto mt-10' style='max-width: 700px'>
            <v-card-title class='py-0 pr-3' style='color: var(--sn-main-blue)'>
                {{title}}
            </v-card-title>
            <v-card class="main-card py-5 px-8">
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
        return (this.$route.path === '/login') ? 'Авторизация' : 'Регистрация'
    }
}
</script>

<style scoped lang='scss'>
.background {
    background-color: var(--sn-unauthorized-theme);
    height: 100vh;
}

.main-card {
    background: var(--sn-main-blue);
    color: white;
}
</style>
