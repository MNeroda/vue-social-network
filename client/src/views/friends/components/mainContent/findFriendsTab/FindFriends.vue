<template>
    <div>
        <search-friend-field
            :searchText="searchText"
            @input="changeSearchHandler"
        />
        <v-btn @click="test"></v-btn>
        <h1>{{ socketBack }}</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SearchFriendField from '@/views/friends/components/mainContent/SearchFriendField.vue';
import { emitSocketsEvent, onSocketsEvent } from '@/types/socketEvents';

@Component({
    components: { SearchFriendField },
})
export default class FindFriends extends Vue {
    searchText = '';

    socketBack = '';

    friendsList: any[] = [];
    @Watch('friendsList', { deep: true })
    tmpFunc() {
        console.log(this.friendsList);
    }

    test() {
        //testFromBack
        this.$socket.emit(emitSocketsEvent.TEST_FROM_FRONT, '');
    }

    changeSearchHandler(event: string) {
        this.$socket.emit(emitSocketsEvent.FIND_FRIENDS_BY_NAME, event);
    }

    mounted() {
        this.$socket.on(onSocketsEvent.TEST_FROM_BACK, (data: any) => {
            this.socketBack = data;
        });
        this.$socket.on(onSocketsEvent.SET_FRIENDS_BY_NAME, (data: any) => {
            this.friendsList = data;
        });
    }
}
</script>

<style lang="scss"></style>
