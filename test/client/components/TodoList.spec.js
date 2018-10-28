import {config, shallowMount, mount} from '@vue/test-utils'
import TodoItem from '../../../src/client/components/TodoItem.vue'
import TodoList from '../../../src/client/components/TodoList.vue'

// TODO: 하위 컴포넌트 수정시 경고 메시지를 출력되는데, 해당 메시지를 숨기는 옵션이다.
config.logModifiedComponents = false;

describe('TodoList.vue', () => {
    test('타이틀 체크', () => {
        const wrapper = shallowMount(TodoList, {
            propsData: {
                name: 'Alvin'
            }
        })

        expect(wrapper.text()).toEqual('Alvin\'s Todo List')
    })

    test('할일 추가 체크', () => {
        const wrapper = mount(TodoList, {
            propsData: {
                name: 'Alvin'
            }
        })

        wrapper.vm.added({
            id: 'alvin',
            title: 'Do homework',
            complete: false,
            order: 1
        })

        expect(wrapper.find(TodoItem).text()).toContain('Do homework')
    })
})