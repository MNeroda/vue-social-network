<template>
    <v-card class="d-flex flex-column" style="gap: 15px">
        <div>
            <span>{{ info.name }}</span>
            <hr />
        </div>
        <div d-flex flex-column style="max-width: 400px">
            <div v-if="info.phone">
                <span>Телефон</span>
                <span>{{ info.phone }}</span>
            </div>
            <div v-if="info.email" class="d-flex justify-space-between">
                <span>email</span>
                <span>{{ info.email }}</span>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserResource } from '@/recources/UserResource';

const userResource = new UserResource();
@Component
export default class InfoUser extends Vue {
    info = {
        email: '',
        name: '',
        phone: '',
    };
    async mounted() {
        const res = await userResource.getUserInfo(this.$store.state.userId);

        this.info.email = res.email;
        this.info.name = res.name;
        this.info.phone = res.phone;
    }
}
</script>
