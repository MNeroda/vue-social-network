<template>
    <div>
        <h1>You authorized</h1>
        <navbar />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Navbar } from '@/components';

@Component({
    components: {
        Navbar,
    },
})
export default class AuthorizedLayout extends Vue {}
</script>
