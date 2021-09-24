<template>
    <div class="" style="position: relative">
        <navbar />

        <div class="view d-flex bg-light-grey" style="gap: 25px">
            <v-card
                class="sidebar-auth-layout ml-3"
                style="height: fit-content"
            >
                <sidebar-list-items></sidebar-list-items>
            </v-card>
            <div class="main-content-auth-layout mt-0" style="width: 100%">
                <router-view></router-view>
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
    overflow-y: hidden;
    overflow-x: hidden;
    top: $header-height;
    bottom: -100vh;
    left: 0;
    right: 0;
}

.sidebar-auth-layout {
    margin-top: 20px;
}
.main-content-auth-layout {
    @include scrollbar($sn-main-grey);
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 20px;
}
</style>
