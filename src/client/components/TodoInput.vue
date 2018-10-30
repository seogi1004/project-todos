<template>
    <v-flex>
        <v-form ref="form" @submit.prevent="submit">
            <v-text-field solo-inverted flat hide-details
                          label="Please enter your work" prepend-inner-icon="add_box"
                          ref="input" v-model="title" />
        </v-form>
    </v-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import bus from '../EventBus';

    @Component
    export default class TodoInput extends Vue {
        // data
        title: string = '';
        // method
        submit(): void {
            if (!this.title) {
                return;
            }

            // 이벤트 버스를 통한 이벤트 전달 사용
            bus.$emit('added', this.title);
            // init
            this.title = '';
            this.input.focus();
        }
        // computed
        get input(): HTMLInputElement {
            return this.$refs.input as HTMLInputElement;
        }

    }
</script>

<style scoped>

</style>
