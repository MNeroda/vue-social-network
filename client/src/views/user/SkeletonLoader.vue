<template>
    <v-row class="mt-0 mr-5" style="width: available">
        <v-col cols="3" class="d-flex flex-column pt-0 pr-0" style="gap: 15px">
            <v-skeleton-loader
                class="pa-4 bg-white"
                type="image"
            ></v-skeleton-loader>

            <v-skeleton-loader
                class="
                    skeleton-loader-friends
                    pa-4
                    bg-white
                    d-flex
                    justify-center
                "
                style="gap: 10px"
                type="friends@4"
                :types="{ friends: 'avatar@2' }"
            ></v-skeleton-loader>

            <v-skeleton-loader
                class="pa-4 bg-white d-flex flex-column align-center"
                style="gap: 5px"
                type="heading@3"
            ></v-skeleton-loader>
        </v-col>
        <v-col cols="9" class="d-flex flex-column pt-0 pr-0" style="gap: 15px">
            <v-skeleton-loader
                class="skeleton-loader-info pa-4 bg-white d-flex flex-column"
                style="gap: 10px"
                type="info@2, heading"
                :types="{ info: 'heading@2' }"
            ></v-skeleton-loader>

            <v-row class="pa-4 bg-white ma-0" style="border-radius: 4px">
                <v-col cols="3">
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                </v-col>
                <v-col cols="3">
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                </v-col>
                <v-col cols="3">
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                </v-col>
                <v-col cols="3">
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                </v-col>
            </v-row>

            <v-skeleton-loader
                class="pa-4 bg-white"
                type="post@2"
                :types="{ post: 'list-item-avatar, card-heading, paragraph' }"
            ></v-skeleton-loader>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class SkeletonLoader extends Vue {}
</script>

<style lang="scss">
.skeleton-loader-friends {
    .v-skeleton-loader__friends.v-skeleton-loader__bone {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}

.skeleton-loader-info {
    .v-skeleton-loader__info.v-skeleton-loader__bone {
        display: flex;
        gap: 10px;
    }
}
</style>
