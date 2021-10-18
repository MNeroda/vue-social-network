<template>
    <div>
        <button class='bg-white col-blue pa-2 ma-3' style='border-radius: 5px' @click="onButtonClick">CHILD</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TestChildComponent extends Vue {
    onButtonClick() {
        this.$emit('testEvent', 2);
    }
}
</script>

<style scoped lang="scss"></style>
