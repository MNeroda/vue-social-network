<template>
    <div class="mt-5" v-if="$store.state.friendsList">
        <div
            class="my-4 mx-8"
            v-for="friend of $store.state.friendsList"
            :key="friend.id"
        >
            <friend-card :friend="friend" />
            <hr class="mt-4 mb-7 sn-divider" style="width: 90%" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FriendCard from '@/views/friends/components/mainContent/FriendCard.vue';
@Component({
    components: { FriendCard },
})
export default class AllFriends extends Vue {}
</script>

<style scoped lang="scss"></style>
