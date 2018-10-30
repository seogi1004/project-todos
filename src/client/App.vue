<template>
    <v-app>
        <v-toolbar app>
            <v-btn icon>
                <v-icon>menu</v-icon>
            </v-btn>
            <todo-input />
            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <todo-list/>
        </v-content>
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
