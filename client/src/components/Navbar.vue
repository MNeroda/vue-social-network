<template>
    <div class="navbar">
        <v-app-bar class="bg-blue white--text navbar-bg">
            <v-app-bar-nav-icon
                v-if="
                    $route.path.includes('/chat') || $vuetify.breakpoint.mobile
                "
                @click="drawer = true"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>
                <router-link to="/" style="text-decoration: none; color: white"
                    >Соцсеть</router-link
                >
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <sidebar-list-items />
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SidebarListItems from '@/components/SidebarListItems.vue';
@Component({
    components: { SidebarListItems },
})
export default class Navbar extends Vue {
    drawer = false;
    group = null;
}
</script>

<style lang="scss" scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.navbar-bg {
    display: flex;
    align-items: center;
    height: $header-height !important;
}
</style>
