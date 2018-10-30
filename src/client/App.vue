<template>
    <v-app>
        <v-toolbar app>
            <v-flex xs12 md12>
                <todo-input/>
            </v-flex>
        </v-toolbar>

        <v-container>
            <todo-list/>
        </v-container>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import TodoInput from './components/TodoInput';
    import TodoList from './components/TodoList';

    @Component({
        components: {
            TodoInput,
            TodoList
        }
    })
    export default class App extends Vue {

    };
</script>
