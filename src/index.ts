import Vue from 'vue'
import TodoListComponent from './components/TodoList.vue';

new Vue({
    el: '#app',
    template: `
    <div>
      <todo-list-component />
    </div>
    `,
    components: {
        TodoListComponent: TodoListComponent
    }
});
