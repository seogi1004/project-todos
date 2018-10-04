<template>
    <div>
        <h2>Hello! {{name}}.</h2>
        <todo-item id="id-1" :complete="true" title="a"></todo-item>
        <todo-item id="id-2" :complete="false" title="b"></todo-item>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import TodoItem from './TodoItem';

    @Component({
        components : {
            TodoItem : TodoItem
        }
    })
    export default class TodoList extends Vue {
        @Prop({ default: 'World' }) name: string;
    };
</script>

<style scoped>
    h2 {
        color : green;
    }
</style>
