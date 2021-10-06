import { mount } from '@vue/test-utils';
import TestPage from '../src/views/testPage/TestPage.vue';
describe('test configure jest', () => {
    it('jest working', function () {
        expect(2 + 2).toBe(4);
    });
    it('imports, @vue/test-utils, jsdom working correctly', function () {
        const wrapper = mount(TestPage);
        console.log(wrapper);
    });
});
