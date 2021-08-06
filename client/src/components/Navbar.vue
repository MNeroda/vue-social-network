<template>
    <div>
        <v-app-bar
            style="color: white; background-color: var(--sn-main-blue)"
            dark
        >
            <v-app-bar-nav-icon v-if='$route.path === "/chat"' @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <router-link to="/" style='text-decoration: none; color: white'>Соцсеть</router-link>
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <sidebar-list-items/>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SidebarListItems from '@/components/SidebarListItems.vue';
@Component({
    components: { SidebarListItems }
})
export default class Navbar extends Vue {
    drawer = false;
    group = null;
}
</script>
