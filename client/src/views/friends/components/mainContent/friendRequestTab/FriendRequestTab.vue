<template>
    <div v-if="!loading">
        <template v-if="friendsList.length">
            <div
                class="my-4 mx-8"
                v-for="friend of friendsList"
                :key="friend.id"
            >
                <friend-card :friend="friend" />
                <hr class="mt-4 mb-7 sn-divider" style="width: 90%" />
            </div>
        </template>
        <template v-else>
            <h1 class="ml-10">Заявок нет</h1>
        </template>
    </div>
    <div v-else>
        <span class="ml-10 mt-10" style="font-size: 22px"
            >Идет загрузка...</span
        >
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { UserResource } from '@/recources/UserResource';
import { FriendsWebsocket } from '@/types/resources/websocket';
import FriendCard from '@/views/friends/components/mainContent/FriendCard.vue';

const userResource = new UserResource();
@Component({
    components: { FriendCard },
})
export default class FriendRequestTab extends Vue {
    friendsList: FriendsWebsocket[] = [];
    loading = true;
    async mounted(): Promise<void> {
        this.friendsList = await userResource.getFriendsRequest();
        this.loading = false;
    }
}
</script>

<style scoped lang="scss"></style>
