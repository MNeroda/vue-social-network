<template>
    <span class="test-selector">
        <h1>Hello</h1>
        <span>{{count}}</span>
        <button class='bg-white col-blue pa-2 ma-3' style='border-radius: 5px' @click='increment'>Click</button>

        <test-child-component @testEvent='increment($event)'></test-child-component>
    </span>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ClassResource, testGetUser, testUser } from '@/views/testPage/testResource';
import TestChildComponent from '@/views/testPage/TestChildComponent.vue';

const classResource = new ClassResource()
@Component({
    components: { TestChildComponent }
})
export default class TestPage extends Vue {
    count = 0
    users: testUser[] = []
    classResourceData: any = {}
    increment(number) {
        if (typeof number === 'number') {
            this.count += number
        } else {
            this.count++
        }
    }

    async mounted() {
        this.users = await testGetUser()
        /*console.log(this.users);*/
        const posts = await classResource.getPosts()
        const todos = await classResource.getTodos()

/*        console.log('p ', posts);
        console.log('t ', todos);*/
    }
}
</script>

<style scoped lang="scss"></style>
