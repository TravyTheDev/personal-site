<template>
    <div>
        <div @click="emit('close-modal')"
            class="absolute text-black w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex flex-col px-8">
            <div @click.stop class="relative flex flex-col p-4 bg-white self-start m-auto top-0 bottom-0 w-auto">
                <span>{{ firstNum }} - {{ secondNum }}</span>
                <input class="border" v-model="difference" type="number">
                <button class="border p-1 mt-2" @click="submit">Submit</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['close-modal', 'send-vals'])

const firstNum = Math.floor(Math.random() * 100) + 1;
const secondNum = Math.floor(Math.random() * 100) + 1;
const difference = ref(0)

const submit = () => {
    if (difference.value !== firstNum - secondNum) {
        return
    }
    const vals = {
        firstNum: firstNum,
        secondNum: secondNum,
        difference: difference.value
    }
    emit('send-vals', vals)
}
</script>

<style scoped></style>