<template>
    <div
        class="bg-light-grey d-flex flex-column"
        style="position: relative; min-height: 100vh"
    >
        <navbar />
        <router-view
            class="view"
            v-if="$vuetify.breakpoint.mobile || $route.path.includes('/chat')"
        />

        <div v-else class="view d-flex" style="gap: 25px">
            <v-card class="ml-3" style="height: fit-content; margin-top: 20px">
                <sidebar-list-items></sidebar-list-items>
            </v-card>
            <div>
                <router-view style="margin-top: 8px"></router-view>
            </div>
        </div>
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

<style lang="scss" scoped>
.view {
    margin-top: $header-height;
    margin-bottom: 0 !important;
    padding-bottom: 30px;
}
</style>
