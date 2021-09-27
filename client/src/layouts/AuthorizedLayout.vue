<template>
    <div class="" style="position: relative">
        <navbar />

        <v-row class="mt-0 view bg-light-grey">
            <v-col cols="2" class="d-flex flex-column pt-0" style="gap: 15px">
                <v-card
                    class="sidebar-auth-layout ml-3"
                    style="height: fit-content"
                >
                    <sidebar-list-items></sidebar-list-items>
                </v-card>
            </v-col>

            <v-col cols="10" class="d-flex flex-column pt-0" style="gap: 15px">
                <div class="main-content-auth-layout mt-0" style="width: 100%">
                    <router-view></router-view>
                </div>
            </v-col>
        </v-row>
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
