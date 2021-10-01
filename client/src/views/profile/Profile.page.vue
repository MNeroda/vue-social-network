<template>
    <div>
        <v-btn @click="handleLogout">Выйти</v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ActionTypes } from '@/store/types';

@Component
export default class ProfilePage extends Vue {
    handleLogout(): void {
        this.$store.dispatch(ActionTypes.LOGOUT);
        this.$router.push('/login');
    }
}
</script>
