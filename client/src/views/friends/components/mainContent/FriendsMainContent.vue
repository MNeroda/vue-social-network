<template>
    <v-card>
        <v-tabs class="mt-7" v-model="tab" active-class="col-blue">
            <v-tabs-slider class="col-blue" />
            <v-tab v-for="item in items" :key="item.tab">
                {{ item.tab }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
                <component :is="item.content"></component>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
    AllFriends,
    FindFriends,
    FriendRequestTab,
} from '@/views/friends/components/mainContent';

function tabNumToName(num: number) {
    switch (num) {
        case 0:
            return 'all-friends';
        case 1:
            return 'find-friends';
        case 2:
            return 'friends-request';
        default:
            throw new Error('попытка получения query с неизвестного таба');
    }
}

function tabNameToNum(str: string) {
    switch (str) {
        case 'all-friends':
            return 0;
        case 'find-friends':
            return 1;
        case 'friends-request':
            return 2;
        default:
            throw new Error('попытка получения query с неизвестного таба');
    }
}

@Component
export default class FriendsMainContent extends Vue {
    tab = 0;
    @Watch('tab')
    changeQueryName(): void {
        if (this.$route.query.tab !== tabNumToName(this.tab)) {
            this.$router.push(
                `${this.$route.path}?tab=${tabNumToName(this.tab)}`
            );
        }
    }
    items = [
        { tab: 'Все друзья', content: AllFriends },
        { tab: 'Поиск друзей', content: FindFriends },
        { tab: 'Заявки на добавления', content: FriendRequestTab },
    ];

    mounted(): void {
        if (this.$route.query.tab) {
            this.tab = tabNameToNum(this.$route.query.tab.toString());
        }
    }
}
</script>

<style scoped lang="scss">
.tmp {
    transform: scale(1, 1) !important;
    color: red !important;
}
</style>
