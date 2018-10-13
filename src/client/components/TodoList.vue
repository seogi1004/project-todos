<template>
    <div>
        <h2>{{name}}'s Todo List</h2>
        <div clas="list-box">
            <todo-item v-for="item in items" :title="item.title" :complete="item.complete" :order="item.order"/>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    import Vue from 'vue';
    import {Component, Prop, Provide, Inject} from 'vue-property-decorator';
    import TodoItem from './TodoItem';

    export interface Todo {
        id: string,
        title: string,
        complete: boolean,
        order: number
    }

    @Component({
        components: {
            TodoItem: TodoItem
        }
    })
    export default class TodoList extends Vue {
        @Prop({default: 'Antop'}) name: string;

        items: Array<Todo> = [];

        mounted(): void {
            axios.get('/todo')
                .then(res => {
                    this.items = res.data;
                    console.log(this.items);
                })
                .catch(error => {
                    // 어떻게 하지?
                    console.log(error);
                })
        }
    };
</script>

<style scoped>
    h2 {
        color: green;
    }
</style>
