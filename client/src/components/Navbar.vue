<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/register">register</router-link> |
        <router-link to="/login">login</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {}
</script>
