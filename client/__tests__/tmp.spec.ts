import { mount, createLocalVue } from '@vue/test-utils';
import ChildPage from '../src/views/testPage/ChildPage.vue';
describe('test configure jest', () => {
    let localVue = createLocalVue();
    const commentBody = 'test';
    localVue = createLocalVue();


    it('test child page', function () {
        const wrapper = mount(ChildPage, {
            localVue,
            propsData: { commentBody },
        });
/*        const button = wrapper.find('button')
        button.trigger('click')*/

        expect(wrapper.find('button').is('button')).toBe(true)

/*        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(wrapper.is(ChildPage)).toBeTruthy()
        console.log('wvm ', wrapper.vm.rating);*/

/*        expect(wrapper.vm.commentBody).toEqual(commentBody)
        expect(wrapper.vm.rating).toEqual(0)*/
    });
});
