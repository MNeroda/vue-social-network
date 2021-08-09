<template>
    <div>
        <h1>Chat page</h1>
        <router-link to='/chat'>test link 1</router-link>
        <router-link to='/chat/id2'>test link 2</router-link>
        <router-link to='/chat/id3'>test link 3</router-link>
    </div>
</template>


<script lang='ts'>

import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class ChatPage extends Vue {

    @Watch('$route',  { immediate: true, deep: true })
    logRouteParams() {
        console.log(this.$route.params.id);
    }
}
</script>