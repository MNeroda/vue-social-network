<template>
    <v-row class='mt-3 mx-1' style='height: 100%'>
        <v-col cols='2'>
            <chat-list></chat-list>
        </v-col>
        <v-col cols='10'>
            <chat-content></chat-content>
        </v-col>

    </v-row>

<!--    <div>
        <h1>Chat page</h1>
        <router-link to='/chat'>test link 1</router-link>
        <router-link to='/chat/id2'>test link 2</router-link>
        <router-link to='/chat/id3'>test link 3</router-link>
    </div>-->
</template>


<script lang='ts'>

import { Component, Vue, Watch } from 'vue-property-decorator';
import {UserResource} from '@/recources/UserResource'
import ChatList from '@/views/chat/components/ChatList.vue';
import ChatContent from '@/views/chat/components/ChatContent.vue';

const userResource = new UserResource()
@Component({
    components: { ChatContent, ChatList }
})
export default class ChatPage extends Vue {

/*    @Watch('$route',  { immediate: true, deep: true })
    logRouteParams() {
        console.log(this.$route.params.id);
    }*/

    async mounted() {
        const data = await userResource.getConversation()
    }


}
</script>