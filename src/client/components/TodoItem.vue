<template>
    <v-card class="mt-1">
        <v-container pa-0>

            <v-layout align-center row fill-height>

                <v-flex class="btn-block">
                    <v-btn flat icon :color="done ? 'green' : 'grey lighten-1'" @click="changeDone">
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex md12 xs12>
                    <todo-title xs12 md12 :done="done" :title="item.title" @edited="onTitleChanged"/>
                </v-flex>

                <v-flex class="btn-block">
                    <v-btn flat icon color="red" @click="remove">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-flex>

            </v-layout>

        </v-container>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Emit} from 'vue-property-decorator';
    import TodoTitle from './TodoTitle';
    import {Todo} from '../model/Todo';

    @Component({
        components: {
            TodoTitle
        }
    })
    export default class TodoItem extends Vue {
        // prop
        @Prop() item: Todo;
        // data
        title: string = this.item.title;
        done: boolean = this.item.done;

        @Emit('edited')
        edited(): Todo {
            return {
                id: this.item.id,
                title: this.title,
                done: this.done,
                order: this.item.order
            };
        }

        @Emit('removed')
        remove(): string {
            return this.item.id;
        }

        onTitleChanged(title: string): void {
            this.title = title;
            this.edited();
        }

        changeDone(): void {
            this.done = !this.done;
            this.edited();
        }

    }
</script>

<style scoped>
    .btn-block {
        width: 52px;
    }
</style>
