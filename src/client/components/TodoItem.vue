<template>
    <div>
        <input type="checkbox" v-model="isComplete" @change="changeComplete">{{title}}
        <span :class="$style.link" @click="remove">x</span>
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class TodoItem extends Vue {
        @Prop() id: string;
        @Prop({default: false}) complete: boolean;
        @Prop({default: 'No Title'}) title: string;

        isComplete: boolean = this.complete;

        remove(): void {
            axios.delete('/todo/' + this.id)
                .then(() => {
                    this.$emit('removed', this.id);
                })
                .catch(error => {
                    // 어떻게 하지?
                    console.log(error);
                });

        }

        changeComplete(): void {
            axios.put('/todo/' + this.id, {
                title: this.title,
                complete: this.isComplete
            }).catch(error => {
                // 어떻게 하지?
                console.log(error);
            });
        }

    }
</script>

<style scoped module>
    .link {
        cursor: pointer;
        font-weight: bold;
        color: red;
    }
</style>
