<template>
    <div>
        <skeleton-loader v-if="loading"></skeleton-loader>
        <v-row v-else class="mt-0 mr-2">
            <v-col cols="3" class="d-flex flex-column pt-0" style="gap: 15px">
                <avatar-user :is-have-avatar="info.isHaveAvatar" />
                <friends-user />
                <groups-user />
            </v-col>
            <v-col cols="9" class="d-flex flex-column pt-0" style="gap: 15px">
                <info-user />
                <photo-user />
                <post-list-user />
            </v-col>
            <v-col><v-btn @click="test">TEST</v-btn></v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
    AvatarUser,
    FriendsUser,
    GroupsUser,
    InfoUser,
    PhotoUser,
    PostListUser,
} from './components';
import { UserResource } from '@/recources/UserResource';
import Loader from '@/components/Loader.vue';
import SkeletonLoader from '@/views/user/SkeletonLoader.vue';
import { IUserInfo } from '@/types/resources/userResource';

const userResource = new UserResource();
@Component({
    components: {
        SkeletonLoader,
        Loader,
        AvatarUser,
        FriendsUser,
        GroupsUser,
        InfoUser,
        PhotoUser,
        PostListUser,
    },
})
export default class HomePage extends Vue {
    test() {
        console.log(this.$vuetify.breakpoint.mobile);
    }

    info: IUserInfo | null = null;

    loading = true;

    async mounted() {
        this.info = await userResource.getUserInfo(this.$store.state.userId);
        console.log(this.info);
        this.loading = false;
    }
}
</script>

<style lang="scss" scoped>
* {
    color: black;
}
</style>
