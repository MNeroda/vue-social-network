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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IUserInfo } from '@/types/resources/userResource';

@Component
export default class InfoUser extends Vue {
    @Prop() info!: IUserInfo;
}
</script>
