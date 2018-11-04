import {config, shallowMount} from '@vue/test-utils'
import TodoList from '../../../src/client/components/TodoList.vue'

jest.mock('../../../src/client/EventBus.ts');

// TODO: 하위 컴포넌트 수정시 경고 메시지를 출력되는데, 해당 메시지를 숨기는 옵션이다.
config.logModifiedComponents = false;

describe('TodoList.vue', () => {
    test('할일 추가 체크', () => {
        // const wrapper = shallowMount(TodoList);


    })
})