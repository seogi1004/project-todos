<template>
    <v-content>
        <!-- https://vuejs.org/v2/guide/list.html#key -->
        <todo-item v-if="items.length" v-for="item in items" :key="item.id" :item="item" @edited="edited"
                   @removed="removed"/>
        <v-layout v-if="!items.length" align-center justify-center mt-4 class="text-xs-center">
            <v-flex xs12 sm8 md4>
                <v-icon class="big">error_outline</v-icon>
                <h2>할일 없냐?</h2>
            </v-flex>
        </v-layout>
    </v-content>
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
    .empty {
        font-weight: normal;
    }

    .big {
        font-size: 120px;
    }
</style>
