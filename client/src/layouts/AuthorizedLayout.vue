<template>
    <div>
        <navbar />
        <router-view v-if='$vuetify.breakpoint.mobile || $route.path.includes("/chat")'/>

        <v-row class='pa-5' v-else>
            <v-col cols="2">
                <v-card>
                    <sidebar-list-items></sidebar-list-items>
                </v-card>
            </v-col>
            <v-col cols='10'>
                <router-view />
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

<style scoped>

</style>
