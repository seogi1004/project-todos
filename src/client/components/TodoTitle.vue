<template>
    <v-layout>
        <h3 v-if="!editing" :class="done ? 'done' : ''" @click="edit">{{ text }}</h3>
        <v-text-field autofocus hide-details single-line append-icon="refresh" @click:append="reset"
                      v-if="editing" v-model="text" @change="edited" @blur="blur"/>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Emit} from 'vue-property-decorator';

    @Component
    export default class TodoTitle extends Vue {
        // prop
        @Prop() title: string;
        @Prop() done: boolean;
        // data
        text: string = this.title;
        editing: boolean = false;

        edit(): void {
            this.editing = true;
        }

        edited(): void {
            this.blur();
        }

        reset(): void {
            this.text = this.title;
        }

        blur(): void {
            this.editing = false;
            if (this.title != this.text) {
                this.$emit('edited', this.text);
            }
        }

    }
</script>

<style scoped>
    .done {
        text-decoration: line-through;
        color: #8e8e8e;
        font-style: italic;
    }

    .v-text-field {
        margin-top: 0px;
        padding-top: 0px;
    }
</style>
