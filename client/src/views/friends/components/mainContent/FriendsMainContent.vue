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
} from '@/views/friends/components/mainContent';

@Component
export default class FriendsMainContent extends Vue {
    tab = 0;
    items = [
        { tab: 'Все друзья', content: AllFriends },
        { tab: 'Поиск друзей', content: FindFriends },
    ];
}
</script>

<style scoped lang="scss">
.tmp {
    transform: scale(1, 1) !important;
    color: red !important;
}
</style>
