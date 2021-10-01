<template>
    <v-dialog
        v-model="dialog"
        max-width="700"
        transition="dialog-bottom-transition"
        persistent
    >
        <v-card style="padding: 30px; min-height: 450px">
            <div class="d-flex justify-space-between">
                <span style="font-size: 25px">Модальное окно</span>
                <v-btn
                    depressed
                    @click="$emit('dialogClose')"
                    text
                    retain-focus-on-click
                    small
                    class="pa-0"
                >
                    <v-icon size="24">mdi-close</v-icon>
                    закрыть
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SnModal extends Vue {
    @Prop() dialog!: boolean;
}
</script>

<style scoped lang="scss"></style>
