<template>
    <div class="view" style="position: relative">
        <navbar />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Navbar, SidebarListItems } from '@/components';

@Component({
    components: {
        SidebarListItems,
        Navbar,
    },
})
export default class AuthorizedLayout extends Vue {}
</script>
