<template>
    <div>
        <input type="checkbox" v-model="isComplete" @change="changeComplete">{{title}}
        <span :class="$style.link" @click="remove">x</span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Emit} from 'vue-property-decorator';

    @Component
    export default class TodoItem extends Vue {
        @Prop() id: string;
        @Prop({default: false}) complete: boolean;
        @Prop({default: 'No Title'}) title: string;

        isComplete: boolean = this.complete;

        @Emit("remove")
        remove(): void {
            console.log('-- remove click --');
            console.log('id:', this.id);
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
