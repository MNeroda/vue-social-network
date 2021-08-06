<template>
    <div class="background">
        <navbar />
        <v-container class=''>
            <v-row justify="center">
                <v-col cols="2">
                    <v-card>
                        <sidebar v-if='$route.path !== "/chat"' />
                    </v-card>
                </v-col>
                <v-col cols="10">
                    <router-view />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Navbar, Sidebar } from '@/components';

@Component({
    components: {
        Navbar,
        Sidebar,
    },
})
export default class AuthorizedLayout extends Vue {}
</script>

<style scoped>
.background {
    background-color: var(--sn-unauthorized-theme);
    height: 100vh;
}
</style>
