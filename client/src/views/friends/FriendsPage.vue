<template>
    <div class="ml-5 mr-7">
        <v-row class="mt-0">
            <v-col cols="9" class="d-flex flex-column pt-0" style="gap: 15px">
                <friends-main-content />
            </v-col>
            <v-col cols="3" class="d-flex flex-column pt-0" style="gap: 15px">
                <friends-sidebar />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FriendsMainContent from '@/views/friends/components/mainContent/FriendsMainContent.vue';
import FriendsSidebar from '@/views/friends/components/sidebar/FriendsSidebar.vue';
@Component({
    components: { FriendsSidebar, FriendsMainContent },
})
export default class FriendsPage extends Vue {}
</script>

<style scoped lang="scss"></style>
