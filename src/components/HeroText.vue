<template>
    <div>
        <div>
            <div @click="touched('one')" class="absolute h-24 w-24 top-0 left-0"></div>
            <div @click="touched('two')" class="absolute h-24 w-24 top-0 right-0">
            </div>
            <div @click="touched('three')" class="absolute h-24 w-24 bottom-0 right-0"></div>
            <div @click="touched('four')" class="absolute h-24 w-24 bottom-0 left-0"></div>
            <div
                class="pointer-events-none absolute text-white flex flex-col gap-1 self-start w-full m-auto items-center justify-center top-0 bottom-0 w-auto">
                <img class="mix-blend-color-dodge" src="/images/logo-small3.png">
                
                <h1 class="text-4xl">Hello, I'm Travis</h1>
                <div class="pointer-events-auto text-white">
                    <slot />
                </div>
                <h2>Click all 4 corners</h2>
                <p><span :class="{'clicked': one}">1</span> - <span :class="{'clicked': two}">2</span></p>
                <p><span :class="{'clicked': four}">4</span> - <span :class="{'clicked': three}">3</span></p>
                <a href="#about" @click="showChat" v-if="four"
                    class="pointer-events-auto hover:cursor-pointer text-red-500 border border-red-500 px-2">ENTER</a>
                <button v-else class="text-black">.</button>
            </div>
        </div>
        <div class="fixed bottom-0 z-10 w-full" v-if="isShowChat">
            <div class="mx-auto max-w-screen-sm">
                <Chat :SERVER_URL="SERVER_URL" client:only="vue" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Chat from './Chat.vue';

const props = defineProps({
    SERVER_URL: String,
})

const isShowChat = ref(false)
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

const showChat = () => {
    isShowChat.value = true
}

</script>

<style scoped>
    .clicked{
        color: rgb(245 158 11);
    }
</style>