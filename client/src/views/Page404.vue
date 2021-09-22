<template>
    <div>
        <h3>Такой страницы не найдено</h3>
        <router-link v-if="$store.state.token" to="/" class="white--text"
            >Перейти на главную</router-link
        >
        <router-link v-else to="/login" class="white--text"
            >Перейти к авторизации</router-link
        >
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Page404 extends Vue {}
</script>
