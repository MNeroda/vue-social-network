<template>
    <v-list dense>
        <v-list-item-group color="primary" class="d-flex flex-column">
            <v-list-item
                link
                v-for="item in items"
                :key="item.link"
                style="gap: 10px"
                :to="item.link"
            >
                <v-icon>{{ item.icon }}</v-icon>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface IListItems {
    text: string;
    icon: string;
    link: string;
}
@Component
export default class SidebarListItems extends Vue {
    items: Array<IListItems> = [
        { text: 'Главная', icon: 'mdi-clock', link: '/' },
        { text: 'Профиль', icon: 'mdi-clock', link: '/profile' },
        { text: 'Диалоги', icon: 'mdi-account', link: '/chat' },
        { text: 'Друзья', icon: 'mdi-account', link: '/friends' },
        { text: 'Сообщества', icon: 'mdi-account', link: '/groups' },
    ];
}
</script>
