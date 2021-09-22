<template>
    <v-card class="d-flex flex-column" style="gap: 15px">
        <div>
            <span>{{ form.name }}</span>
            <hr />
        </div>
        <div d-flex flex-column style="max-width: 400px">
            <div v-if="form.phone">
                <span>Телефон</span>
                <span>{{ form.phone }}</span>
            </div>
            <div v-if="form.email" class="d-flex justify-space-between">
                <span>email</span>
                <span>{{ form.email }}</span>
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
    form = {
        email: '',
        name: '',
        phone: '',
    };
    async mounted() {
        const res = await userResource.getUserInfo(this.$store.state.userId);

        this.form.email = res.email;
        this.form.name = res.name;
        this.form.phone = res.phone;
    }
}
</script>
