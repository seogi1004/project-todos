import sinon from 'sinon'
import {shallowMount} from '@vue/test-utils'
import TodoItem from '../../../src/client/components/TodoItem.vue'
import {RemoveState} from '../../../src/client/consts/RemoveState'

describe('TodoItem.vue', () => {
    test('할일 상태 체크', () => {
        const wrapper = shallowMount(TodoItem, {
            propsData: {
                item: {
                    id: 'alvin',
                    title: 'Homework',
                    done: false,
                    order: 1
                }
            }
        })

        const sandbox = sinon.createSandbox();

        // removeStatus 상태 변경 확인
        sandbox.stub(wrapper.vm.$data, 'removeStatus').value(RemoveState.Question);
        expect(wrapper.vm.$data.removeStatus).toBe(RemoveState.Question);
        sandbox.restore();
        expect(wrapper.vm.$data.removeStatus).toBe(RemoveState.Waiting);

        // edited 함수가 호출되는지 확인
        const edited = sandbox.spy(wrapper.vm, 'edited');
        wrapper.vm._changeTitle('Homework2');
        sandbox.restore();
        expect(edited.calledOnce).toBe(true);
    })
})