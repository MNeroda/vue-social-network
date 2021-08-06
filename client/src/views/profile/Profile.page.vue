<template>
    <div>
        <v-btn @click="handleLogout">Выйти</v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { MutationTypes } from '@/store/types';

@Component
export default class ProfilePage extends Vue {
    handleLogout(): void {
        this.$store.commit(MutationTypes.SET_TOKEN, null);
        this.$router.push('/login');
    }

}
</script>
