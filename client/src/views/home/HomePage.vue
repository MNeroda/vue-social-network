<template>
    <v-row>
        <v-col cols="3">
            <avatar-user />
            <friends-user />
            <groups-user />
        </v-col>
        <v-col cols="9">
            <info-user />
            <photo-user />
            <post-list-user />
        </v-col>
        <v-col><v-btn @click="test">TEST</v-btn></v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
    AvatarUser,
    FriendsUser,
    GroupsUser,
    InfoUser,
    PhotoUser,
    PostListUser,
} from './components';

@Component({
    components: {
        AvatarUser,
        FriendsUser,
        GroupsUser,
        InfoUser,
        PhotoUser,
        PostListUser,
    },
})
export default class HomePage extends Vue {
    test() {
        console.log(this.$vuetify.breakpoint.mobile);
    }
}
</script>
