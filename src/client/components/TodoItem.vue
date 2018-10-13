<template>
    <div>
        <input type="checkbox" v-model="isComplete" @change="changeComplete">{{title}}
        <span :class="$style.link" @click="remove">x</span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class TodoItem extends Vue {
        @Prop() id: string;
        @Prop({default: false}) complete: boolean;
        @Prop({default: 'No Title'}) title: string;

        isComplete: boolean = this.complete;

        remove(): void {
            this.$el.remove();
        }

        changeComplete(): void {
            console.log("-- change --");
            console.log(this.isComplete);
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
