<template>
    <div>
        <search-friend-field
            :searchText="searchText"
            @input="changeSearchHandler"
        />
        <hr v-if="friendsList.length" class="sn-divider" />
        <div class="my-4 mx-8" v-for="friend of friendsList" :key="friend.id">
            <friend-card :friend="friend" />
            <hr class="mt-4 mb-7 sn-divider" style="width: 90%" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
    SearchFriendField,
    FriendCard,
} from '@/views/friends/components/mainContent';
import { emitSocketsEvent, onSocketsEvent } from '@/types/socketEvents';
import { FindUserWebsocket } from '@/types/resources/websocket';

@Component({
    components: { FriendCard, SearchFriendField },
})
export default class FindFriends extends Vue {
    searchText = '';
    friendsList: FindUserWebsocket[] = [];

    changeSearchHandler(event: string): void {
        this.$socket.emit(emitSocketsEvent.FIND_FRIENDS_BY_NAME, event);
    }

    mounted(): void {
        this.$socket.on(
            onSocketsEvent.SET_FRIENDS_BY_NAME,
            (data: FindUserWebsocket[]) => {
                this.friendsList = data;
            }
        );
    }
}
</script>

<style lang="scss"></style>
