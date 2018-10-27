<template>
    <div>
        <h2>{{name}}'s Todo List</h2>
        <todo-input @added="added"/>
        <div clas="list-box">
            <!-- https://vuejs.org/v2/guide/list.html#key -->
            <todo-item v-for="item in items"
                       :key="item.id" :id="item.id" :title="item.title" :complete="item.complete" :order="item.order"
                       @removed="removed"/>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import TodoInput from './TodoInput';
    import TodoItem from './TodoItem';

    export interface Todo {
        id: string,
        title: string,
        complete: boolean,
        order: number
    }

    @Component({
        components: {
            TodoInput,
            TodoItem: TodoItem
        }
    })
    export default class TodoList extends Vue {
        @Prop({default: 'Antop'}) name: string;

        items: Array<Todo> = [];

        added(item: Todo): void {
            this.items.unshift(item);
        }

        removed(id: string): void {
            //TODO 받은 id 로 배열에서 찾아서 지우는 로직 개선하면 좋을듯
            this.items = this.items.filter(v => v.id != id);
        }

        mounted(): void {
            axios.get('/todo')
                .then(res => {
                    this.items = res.data;
                })
                .catch(error => {
                    // 어떻게 하지?
                    console.log(error);
                });
        }
    };
</script>

<style scoped>
    h2 {
        color: green;
    }
</style>
