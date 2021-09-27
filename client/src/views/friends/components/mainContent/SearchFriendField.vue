<template>
    <v-form class="mx-10 mt-5">
        <v-text-field
            :value="searchText"
            @input="$emit('input', $event)"
            class="find-friends-input"
            outlined
            placeholder="Введите имя"
            :aria-autocomplete="false"
        >
            <template v-slot:append-outer>
                <v-icon class="test" size="36px"> mdi-magnify </v-icon>
            </template>
        </v-text-field>
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SearchFriendField extends Vue {
    @Prop() searchText!: string;
}
</script>

<style lang="scss">
.find-friends-input {
    .v-input__append-outer {
        margin-top: 12px !important;
    }
}
</style>
