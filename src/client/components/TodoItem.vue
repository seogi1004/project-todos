<template>
    <v-card class="mt-1">
        <v-container pa-0>

            <v-layout align-center row fill-height>

                <v-flex class="icon-block">
                    <v-btn flat icon>
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex xs12 md12>
                    <h3 :class="done ? 'done' : ''">{{ title }}</h3>
                </v-flex>

                <v-flex class="icon-block">
                    <v-btn flat icon color="red">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-flex>

            </v-layout>

        </v-container>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Emit, Watch} from 'vue-property-decorator';
    import {Todo} from '../model/Todo';

    @Component
    export default class TodoItem extends Vue {
        // prop
        @Prop() item: Todo;
        // data
        title: string = this.item.title;
        done: boolean = this.item.done;
        textDecoration: string = 'none';

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

        @Watch('done')
        onDoneChanged(): void {
            this.textDecoration = this.done ? 'line-through' : 'none';
            this.edited();
        }

        mounted(): void {
            this.onDoneChanged();
        }

    }
</script>

<style scoped>
    .done {
        text-decoration: line-through;
        color: #8e8e8e;
        font-style: italic;
    }

    .icon-block {
        width: 52px;
    }
</style>
