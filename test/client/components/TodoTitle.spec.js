import {shallowMount} from '@vue/test-utils'
import TodoTitle from '../../../src/client/components/TodoTitle.vue'

describe('TodoTitle.vue', () => {
    test('할일 타이틀 체크', () => {
        const wrapper = shallowMount(TodoTitle, {
            propsData: {
                title: 'Hello',
                done: 'done'
            }
        });

        expect(wrapper.find('h3').text()).toEqual('Hello')
    })
})