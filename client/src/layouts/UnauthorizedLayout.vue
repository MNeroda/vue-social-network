<template>
    <div class="background">
        <v-container class='ma-auto'>
            <v-row>
                <v-col cols='9'>
                    <v-card
                        class="tmp"
                    >
                        <router-link class='white-text' to="/">Home</router-link> |
                        <router-link class='white-text' to="/register">register</router-link> |
                        <router-link class='white-text' to="/login">login</router-link>
                        <router-view/>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>




<!--        <div class="row">
            <div class="col s4 offset-s4">
                <h4 class='tmp'>Вход</h4>
                <div class="card blue white-text">

                </div>
            </div>
        </div>-->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Navbar } from '../components';
@Component({
    components: {
        Navbar,
    },
})
export default class UnauthorizedLayout extends Vue {}
</script>

<style scoped>
.background {
    background-color: var(--unauthorized-theme);
    height: 100vh;
}

/*.tmp {
    color: #2196f3;
    width: 500px;
}*/
</style>
