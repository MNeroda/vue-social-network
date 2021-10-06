<template>
    <sn-modal
        v-if="dialog"
        :dialog="dialog"
        @dialogClose="closeDialogHandler"
        title="Создать группу"
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
            :items="$store.state.friendsList"
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
                @click="createGroup"
                >Создать группу</v-btn
            >
        </div>
    </sn-modal>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';
import SnModal from '@/components/SnModal.vue';
import { validators } from '@/modules/validators';
import { VForm } from '@/types/VForm';
import FriendCardCreateGroup from '@/components/modals/createGroup/FriendCardCreateGroup.vue';
import {
    emitSocketsEvent,
    onSocketsEvent,
    removeSocketListenersType,
} from '@/types/socketEvents';
import { unsubscribeSocket } from '@/modules/helpers/unsubscribeSocket';

@Component({
    components: { FriendCardCreateGroup, SnModal },
})
export default class CreateDialogModal extends Vue {
    @Model('dialogClose') dialog!: boolean;
    groupName = '';
    groupNameRules = [validators.required('Введите название группы')];
    friends: string[] = [];
    isValidForm = false;
    get groupNameRef(): VForm {
        return this.$refs.groupNameRef as VForm;
    }

    closeDialogHandler(): void {
        this.$emit('dialogClose', false);
    }

    async createGroup(): Promise<void> {
        if (!this.isValidForm) {
            this.groupNameRef.validate();
            return;
        }
        this.$socket.emit(emitSocketsEvent.CREATE_GROUP, {
            groupName: this.groupName,
            friendsIds: this.friends,
        });
    }

    removeSocketListeners: removeSocketListenersType = {};
    async mounted(): Promise<void> {
        this.removeSocketListeners.GROUP_CREATED = this.$socket.on(
            onSocketsEvent.GROUP_CREATED,
            (groupId: string) => {
                this.closeDialogHandler();
                this.$router.push(`/chat/${groupId}`);
            }
        );
    }
    destroyed() {
        unsubscribeSocket(this.removeSocketListeners);
    }
}
</script>

<style lang="css" scoped></style>
