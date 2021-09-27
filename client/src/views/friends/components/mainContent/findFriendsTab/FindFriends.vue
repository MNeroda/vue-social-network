<template>
    <div>
        <search-friend-field v-model="searchText" />
        <v-btn @click="test"></v-btn>
        <h1>{{ socketBack }}</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchFriendField from '@/views/friends/components/mainContent/SearchFriendField.vue';
import { emitSocketsEvent, onSocketsEvent } from '@/types/socketEvents';

@Component({
    components: { SearchFriendField },
})
export default class FindFriends extends Vue {
    searchText = '';

    socketBack = '';
    test() {
        //testFromBack
        this.$socket.emit(emitSocketsEvent.TEST_FROM_FRONT, '');
    }

    mounted() {
        this.$socket.on(onSocketsEvent.TEST_FROM_BACK, (data: any) => {
            this.socketBack = data;
        });
    }
}
</script>

<style lang="scss"></style>
