import {shallowMount} from '@vue/test-utils'
import TodoItem from '../../../src/client/components/TodoItem.vue'

describe('TodoItem.vue', () => {
    const wrapper = shallowMount(TodoItem, {
        propsData: {
            title: 'Go to the bank',
            complete: true
        }
    })

    test('타이틀 체트', () => {
        expect(wrapper.text()).toContain('Go to the bank')
    })

    test('체크 상태 체크', () => {
        expect(wrapper.find('input').element.checked).toBe(true)
    })
})