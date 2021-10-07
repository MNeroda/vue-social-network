<template>
    <div>
        <skeleton-loader v-if="loading"></skeleton-loader>
        <v-row v-else class="mt-0 mr-2">
            <v-col cols="3" class="d-flex flex-column pt-0" style="gap: 15px">
                <avatar-user
                    :isHaveAvatar="info.isHaveAvatar"
                    :isOwnerPage="isOwnerPage"
                />
                <friends-user :isOwnerPage="isOwnerPage" />
                <groups-user />
            </v-col>
            <v-col cols="9" class="d-flex flex-column pt-0" style="gap: 15px">
                <info-user :info="info" />
                <photo-user :userId='info.id' :userName='info.name' :isOwnerPage='isOwnerPage'/>
                <post-list-user />
            </v-col>
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
import SkeletonLoader from '@/views/user/SkeletonLoader.vue';
import { IUserInfo } from '@/types/resources/userResource';

const userResource = new UserResource();
@Component({
    components: {
        SkeletonLoader,
        AvatarUser,
        FriendsUser,
        GroupsUser,
        InfoUser,
        PhotoUser,
        PostListUser,
    },
})
export default class HomePage extends Vue {
    info: IUserInfo | null = null;

    loading = true;
    isOwnerPage = false;

    async mounted(): Promise<void> {
        const path = this.$route.path;
        if (path === '/' || path === `/user/${this.$store.state.userId}`) {
            this.isOwnerPage = true;
        } else {
            this.isOwnerPage = false;
        }

        let userId;
        if (this.isOwnerPage) userId = this.$store.state.userId;
        else userId = this.$route.params.id;

        this.info = await userResource.getUserInfo(userId);
        if (!this.info) {
            this.$router.push('/page404');
        }
        this.loading = false;
    }
}
</script>

<style lang="scss" scoped>
* {
    color: black;
}
</style>
