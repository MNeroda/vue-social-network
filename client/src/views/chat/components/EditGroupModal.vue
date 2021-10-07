<template>
    <sn-modal
        v-if="dialog"
        :dialog="dialog"
        @dialogClose="closeDialogHandler"
        title="Редактировать группу"
    >
        <v-form v-model="isValidForm">
            <v-text-field
                ref="groupNameRef"
                v-model="groupName"
                class="mt-10"
                placeholder="Введите название группы"
                outlined
                :rules="groupNameRules"
                validate-on-blur
            ></v-text-field>
        </v-form>

        <v-autocomplete
            class="mt-3"
            v-model="friends"
            outlined
            :items="friendsListNotIncludedGroup"
            item-text="name"
            item-value="id"
            multiple
            label="Добавьте друзей"
        >
            <template v-slot:item="data">
                <friend-card-create-group
                    :friend="data.item"
                ></friend-card-create-group>
            </template>
        </v-autocomplete>

        <div class="d-flex justify-end mt-4">
            <v-btn
                class="bg-light-grey col-dark-grey mr-4"
                style="text-transform: none"
                @click="closeDialogHandler"
                >Отменить</v-btn
            >
            <v-btn
                class="bg-blue white--text mr-2"
                style="text-transform: none"
                @click="updateGroup"
                >Обновить группу</v-btn
            >
        </div>
    </sn-modal>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import SnModal from '@/components/SnModal.vue';
import { validators } from '@/modules/validators';
import { VForm } from '@/types/VForm';
import FriendCardCreateGroup from '@/components/modals/createGroup/FriendCardCreateGroup.vue';
import {
    emitSocketsEvent,
    onSocketsEvent,
    removeSocketListenersType,
} from '@/types/socketEvents';
import { ConversationWebsocket } from '@/types/resources/websocket';
import { IFriendInfo } from '@/types/resources/userResource';
import { emptyFunction } from '@/modules/helpers/emptyFunction';
import { unsubscribeSocket } from '@/modules/helpers/unsubscribeSocket';

@Component({
    components: { FriendCardCreateGroup, SnModal },
})
export default class EditGroupModal extends Vue {
    @Model('dialogClose') dialog!: boolean;
    @Prop() userInfo!: ConversationWebsocket;

    groupName = '';
    groupNameRules = [validators.required('Введите название группы')];
    friends: string[] = [];
    isValidForm = false;

    get groupNameRef(): VForm {
        return this.$refs.groupNameRef as VForm;
    }

    get friendsListNotIncludedGroup() {
        if (this.$store.state.friendsList) {
            return this.$store.state.friendsList.filter(
                (friend: IFriendInfo) =>
                    !this.userInfo.members
                        ?.map((member) => member.id)
                        .includes(friend.id)
            );
        } else return [];
    }

    closeDialogHandler(): void {
        this.$emit('dialogClose', false);
    }

    async updateGroup(): Promise<void> {
        if (!this.isValidForm) {
            this.groupNameRef.validate();
            return;
        }
        this.$socket.emit(emitSocketsEvent.UPDATE_GROUP, {
            groupName: this.groupName,
            groupId: this.userInfo.id,
            friendsIds: this.friends,
        });
    }

    removeSocketListeners: removeSocketListenersType = {
        [onSocketsEvent.GROUP_UPDATED]: emptyFunction,
    };
    async mounted(): Promise<void> {
        this.groupName = this.userInfo.name;
        this.removeSocketListeners.GROUP_UPDATED = this.$socket.on(
            onSocketsEvent.GROUP_UPDATED,
            () => {
                this.closeDialogHandler()
                if (this.$route.query.update) {
                    this.$router.push(`${this.$route.path}`)
                } else {
                    this.$router.push(`${this.$route.path}?update=true`)
                }
            }
        );
    }
        destroyed() {
        unsubscribeSocket(this.removeSocketListeners);
    }
}
</script>

<style lang="css" scoped></style>
