<template>
    <div style="position: relative">
        <navbar />

        <div class="view bg-light-grey">
            <div class="d-flex pl-2 pb-1" style="gap: 15px; height: 100%">
                <v-card
                    class="sidebar-auth-layout ml-3 mt-3"
                    style="height: fit-content; flex: 1"
                >
                    <sidebar-list-items></sidebar-list-items>
                </v-card>

                <router-view
                    class="mt-3 router-view-tmp"
                    :key="$route.path"
                    style="flex: 7"
                ></router-view>
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
    position: absolute;
    top: $header-height;
    bottom: -100vh;
    left: 0;
    right: 0;
    background-color: $sn-main-light-grey !important;
}

.router-view-tmp {
    @include scrollbar($sn-main-grey);
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
