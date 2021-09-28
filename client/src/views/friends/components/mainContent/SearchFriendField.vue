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

</style>
