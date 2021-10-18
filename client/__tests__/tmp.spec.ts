/* eslint-disable */
import { shallowMount } from '@vue/test-utils';
import TestPage from '../src/views/testPage/TestPage.vue';
import TestChildComponent from '../src/views/testPage/TestChildComponent.vue'
import {
    testUser,
    testGetUser,
    ClassResource,
} from '../src/views/testPage/testResource';

jest.mock('../src/views/testPage/testResource', () => {
    const mockApi = {
        getPosts: jest.fn(() =>
            Promise.resolve([
                {
                    userId: 1,
                    id: 1,
                    title: 'titlePost',
                    body: 'body',
                },
            ])
        ),
        getTodos: jest.fn(() => Promise.resolve([])),
    };

    return {
        testGetUser: jest.fn(() =>
            Promise.resolve([
                {
                    id: 1,
                    name: 'Test',
                    phone: 'phone',
                    username: 'user',
                },
            ])
        ),
        ClassResource: jest.fn(() => mockApi),
    };
});

describe('test configure jest', () => {
    let wrapper: any;
    let vm: any;
    let users: testUser[];
    beforeEach(() => {
        wrapper = shallowMount(TestPage);
        vm = wrapper.vm;
        users = [
            {
                id: 1,
                name: 'Test',
                phone: 'phone',
                username: 'user',
            },
        ];
    });

    it('should be correct html', function () {
        expect(wrapper.html()).toContain('<span>0</span>');
    });
    it('should have button', function () {
        const button = wrapper.find('button');
        expect(button.isVisible()).toBe(true);
    });
    it('should api works', function () {
        const res = testGetUser();
        expect(res).resolves.toEqual(users);
    });
    it('should count increment on click', function () {
        expect(vm.count).toBe(0);
        vm.increment();
        expect(vm.count).toBe(1);
    });
    it('should emit work', function() {
        vm.$emit('foo')
        vm.$emit('foo', 123)
        expect(wrapper.emitted().foo[1]).toEqual([123])
        expect(wrapper.emitted().foo.length).toBe(2)
    });
    it('should increment count by child emit', function() {
        const child = wrapper.getComponent(TestChildComponent)
        expect(vm.count).toBe(0);
        child.vm.$emit('testEvent', 10)
        expect(vm.count).toBe(10);
    });
});
