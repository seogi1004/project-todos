<template>
    <div>
        <input ref="input" type="text" v-model="title" @keyup.enter.exact="add" />
        <button @click="add">추가</button>
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class TodoInput extends Vue {
        title: string = '';

        add(): void {
            if (this.title.trim() === '') {
                return;
            }

            axios.post('/todo', {
                title: this.title
            }).then(res => {
                this.title = '';
                // this.$refs.input.focus();
                // emit
                this.$emit("added", res.data);
            }).catch(error => {
                // 어떻게 하지?
                console.log(error);
            });
        }

    }
</script>

<style scoped module>

</style>
