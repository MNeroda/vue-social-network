<template>
    <div class="tmp d-flex pl-2 pr-4 pb-1" style="gap: 15px">
        <v-skeleton-loader
            style="gap: 30px; flex: 1"
            class="chat-list-skeleton-loader pa-4 bg-white d-flex flex-column"
            type="dialog@5"
            :types="{ dialog: 'list-item-avatar, chip' }"
        ></v-skeleton-loader>

        <div
            class="bg-white d-flex flex-column pa-5"
            style="flex: 7; gap: 10px"
        >
            <div>
                <div class="message-skeleton">
                    <v-skeleton-loader
                        type="sentences, text"
                    ></v-skeleton-loader>
                </div>
            </div>

            <div>
                <div class="message-skeleton">
                    <v-skeleton-loader type="sentences"></v-skeleton-loader>
                </div>
            </div>

            <div>
                <div class="friend-message-skeleton">
                    <v-skeleton-loader
                        type="text, sentences"
                    ></v-skeleton-loader>
                </div>
            </div>

            <div>
                <div class="message-skeleton">
                    <v-skeleton-loader
                        type="text@2, sentences"
                    ></v-skeleton-loader>
                </div>
            </div>
        </div>
        <!--        <v-skeleton-loader
            class="pa-4 bg-white d-flex flex-column align-center"
            style="gap: 5px; flex: 7"
            type="heading@3"
        ></v-skeleton-loader>-->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style lang="scss">
.chat-list-skeleton-loader {
    .v-skeleton-loader__dialog.v-skeleton-loader__bone {
        overflow: visible !important;
        .v-skeleton-loader__chip.v-skeleton-loader__bone {
            float: right;
            margin-top: 3px;
            margin-right: 15px;
            width: 200px;
        }
    }
}

.message-skeleton {
    width: 500px;
    margin-right: 10px;
    float: right;
    background: $sn-green-message;
    padding: 1em 1.5em;
    border-radius: 10px 10px 0 10px;
    position: relative;
    line-height: 1.5em;

    &:after {
        content: '';
        position: absolute;
        left: 100%;
        bottom: 0.1em;
        width: 1.8em;
        height: 1.8em;
        border: 0.5em solid white;
        border-radius: 50%;
        background: white;
    }
    &:before {
        content: '';
        position: absolute;
        left: 100%;
        bottom: 0;
        width: 1.8em;
        border-radius: 50%;
        border-top: none;
        height: 0.9em;
        border-radius: 0 0 50% 50% / 0 0 100% 100%;
        background: $sn-green-message;
        border-color: silver;
        margin-left: -0.9em;
    }
}

.friend-message-skeleton {
    margin-left: 10px;
    width: 500px;
    margin-right: 10px;
    background: $sn-main-grey;
    padding: 1em 1.5em;
    border-radius: 10px 10px 10px 0;
    position: relative;
    line-height: 1.5em;

    &:after {
        content: '';
        position: absolute;
        right: 100%;
        bottom: 0.1em;
        width: 1.8em;
        height: 1.8em;
        border: 0.5em solid white;
        border-radius: 50%;
        background: white;
    }
    &:before {
        content: '';
        position: absolute;
        right: 100%;
        bottom: 0;
        width: 1.8em;
        border-radius: 50%;
        border-top: none;
        height: 0.9em;
        border-radius: 0 0 50% 50% / 0 0 100% 100%;
        background: $sn-main-grey;
        border-color: $sn-main-grey;
        margin-right: -0.9em;
    }
}
</style>
