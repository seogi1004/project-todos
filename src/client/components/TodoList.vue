<template>
    <v-container>
        <!-- https://vuejs.org/v2/guide/list.html#key -->
        <todo-item v-for="item in items" :key="item.id" :item="item" @edited="edited" @removed="removed"/>
    </v-container>
</template>

<script lang="ts">
    import axios from 'axios';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import TodoItem from './TodoItem';
    import {Todo} from '../model/Todo';
    import bus from '../EventBus';

    @Component({
        components: {
            TodoItem
        }
    })
    export default class TodoList extends Vue {
        // data
        items: Array<Todo> = [];

        // method
        added(title: string): void {
            axios.post('/todo', {
                title: title
            }).then(res => {
                this.items.unshift(res.data);
            }).catch(e => {
                console.log(e);
            });
        }

        // method
        edited(item: Todo): void {
            axios.put('/todo/' + item.id, {
                title: item.title,
                done: item.done
            }).catch(e => {
                console.log(e);
            });
        }

        // method
        removed(id: string): void {
            axios.delete('/todo/' + id)
                .then(() => {
                    // TODO 받은 id 로 배열에서 찾아서 지우는 로직 개선하면 좋을듯
                    this.items = this.items.filter(v => v.id != id);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        // lifecycle hook
        mounted(): void {
            axios.get('/todo')
                .then(res => {
                    this.items = res.data;
                })
                .catch(e => {
                    console.log(e);
                });

            bus.$on('added', (title: string) => {
                this.added(title);
            });
        }
    };
</script>

<style scoped>

</style>
