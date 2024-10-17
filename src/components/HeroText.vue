<template>
    <div @click="touched('one')" class="absolute h-16 w-20 top-0 left-0"></div>
    <div @click="touched('two')" class="absolute h-16 w-20 top-0 right-0">
    </div>
    <div @click="touched('three')" class="absolute h-16 w-20 bottom-0 right-0"></div>
    <div @click="touched('four')" class="absolute h-16 w-20 bottom-0 left-0"></div>
    <div
        class="pointer-events-none absolute text-white flex flex-col gap-1 self-start w-full m-auto items-center justify-center top-0 bottom-0 w-auto">
        <h1 class="text-4xl">Hello, I'm Travis</h1>
        <h2>Click all 4 corners</h2>
        <p>1 - 2</p>
        <p>4 - 3</p>
        <img class="absolute mix-blend-color-dodge top-0 bottom-0" src="/images/logo-small3.png">
        <button v-if="four" class="pointer-events-auto text-red-500 border border-red-500">ENTER</button>
        <button v-else class="text-black">.</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const one = ref(false)
const two = ref(false)
const three = ref(false)
const four = ref(false)

const touched = (square: string) => {
    switch (square) {
        case "one":
            one.value = true
            return
        case "two":
            if (one.value) {
                two.value = true
            }
            return
        case "three":
            if (two.value) {
                three.value = true
            }
            return
        case "four":
            if (three.value) {
                four.value = true
            }
            return
    }
}

</script>

<style scoped></style>