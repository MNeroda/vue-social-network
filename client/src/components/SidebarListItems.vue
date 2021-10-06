<template>
    <div>
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

                <template v-if="showAdditionalItems">
                    <v-list-item
                        v-for="additionalItem of additionalItems"
                        :key="additionalItem.text"
                        style="gap: 10px"
                        @click="additionalItem.func"
                    >
                        <v-icon>{{ additionalItem.icon }}</v-icon>
                        <v-list-item-title>{{
                            additionalItem.text
                        }}</v-list-item-title>
                    </v-list-item>
                </template>
            </v-list-item-group>
        </v-list>
        <create-dialog-modal
            v-if="showAdditionalItems"
            v-model="isShowGroupModal"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SnModal from '@/components/SnModal.vue';
import CreateDialogModal from '@/components/modals/createGroup/CreateGroupModal.vue';

export interface ISidebarItems {
    text: string;
    icon: string;
    link?: string;
}

@Component({
    components: { CreateDialogModal, SnModal },
})
export default class SidebarListItems extends Vue {
    items: ISidebarItems[] = [
        { text: 'Главная', icon: 'mdi-clock', link: '/' },
        { text: 'Профиль', icon: 'mdi-clock', link: '/profile' },
        { text: 'Диалоги', icon: 'mdi-account', link: '/chat' },
        { text: 'Друзья', icon: 'mdi-account', link: '/friends' },
        { text: 'Сообщества', icon: 'mdi-account', link: '/groups' },
    ];

    get showAdditionalItems(): boolean {
        return this.$route.path.includes('/chat');
    }

    isShowGroupModal = false;

    createGroupModal() {
        this.isShowGroupModal = true;
    }

    additionalItems = [
        {
            text: 'Создать группу',
            icon: 'mdi-clock',
            func: this.createGroupModal,
        },
    ];
}
</script>
