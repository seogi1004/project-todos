import {shallowMount} from '@vue/test-utils'
import TodoInput from '../../../src/client/components/TodoInput.vue'

describe('TodoInput.vue', () => {
    test('버튼 이름 체크', () => {
        const wrapper = shallowMount(TodoInput);
        expect(wrapper.find('button').text()).toMatch('추가')
    })
})