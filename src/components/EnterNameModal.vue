<template>
    <div>
        <div @click="emit('close-modal')"
            class="absolute text-black w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex flex-col px-8">
            <div @click.stop class="relative flex flex-col p-4 bg-white self-start m-auto top-0 bottom-0 w-auto">
                <p>Your name:</p>
                <input v-model="name" type="text">
                <span>{{ firstNum }} + {{ secondNum }}</span>
                <input v-model="sum" type="number">
                <button class="self-end border p-1 mt-2" @click="submit">Enter</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['close-modal', 'send-name'])
const name = ref("")
const sum = ref(0)

const firstNum = 1
const secondNum = 1
// const firstNum = Math.floor(Math.random() * 100) + 1;
// const secondNum = Math.floor(Math.random() * 100) + 1;

const submit = () => {
    if (sum.value !== firstNum + secondNum) {
        return
    }
    emit('send-name', name.value)
}
</script>

<style scoped>
input {
    border: black 1px solid;
}
</style>