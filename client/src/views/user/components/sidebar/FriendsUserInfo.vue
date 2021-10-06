<template>
    <v-card class="pa-2 d-flex flex-column">
        <span>Список друзей</span>

        <div class="friends-list mx-6">
            <template v-for="(friend, idx) of friendsList">
                <card-friend-user-info
                    v-if="isShowButtonAll ? idx < 3 : true"
                    :key="friend.id"
                    :friend="friend"
                />
            </template>
        </div>

        <v-btn
            v-if="isShowButtonAll"
            @click="isShowButtonAll = false"
            class="bg-blue white--text mx-auto mt-4"
            >Показать всех</v-btn
        >
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IFriendInfo } from '@/types/resources/userResource';
import { UserResource } from '@/recources/UserResource';
import CardFriendUserInfo from '@/views/user/components/sidebar/CardFriendUserInfo.vue';

const userResource = new UserResource();
@Component({
    components: { CardFriendUserInfo },
})
export default class FriendsUserInfo extends Vue {
    @Prop() isOwnerPage!: boolean;
    friendsList: IFriendInfo[] = [];
    isShowButtonAll = false;

    async mounted(): Promise<void> {
        const id = this.isOwnerPage
            ? this.$store.state.userId
            : this.$route.params.id;
        this.friendsList = await userResource.getFriendsListById(id);
        if (this.friendsList.length > 3) {
            this.isShowButtonAll = true;
        }
    }
}
</script>

<style scoped lang="scss">
.friends-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
}
</style>
