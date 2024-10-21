<template>
    <div class="sticky top-0 py-2 bg-white text-black z-10 text-sm sm:text-base">
        <div class="flex w-full justify-between justify-center items-center font-semibold divide-x">
            <a href="#home" class="w-full hover:cursor-pointer text-center">Home</a>
            <a href="#about" class="w-full hover:cursor-pointer text-center">About</a>
            <a href="#products" class="w-full hover:cursor-pointer text-center">Products</a>
            <a href="#get-started" class="w-full hover:cursor-pointer text-center">Get Started</a>
        </div>
        <p v-if="messageData" class="bg-white text-black absolute translate-y-2 bottom-0 right-0 text-sm border-r border-b">{{ messageData?.msg }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

type Message = {
    msg: string;
}

const evtSource = ref()

const messageData = ref<Message>()

const timeout = ref()

const setEvtSource = () => {
    evtSource.value = new EventSource('http://localhost:8080/stream');
}

const broadcastJoin = async () => {
    const message = {
        msg: "Someone is online!"
    }
    await fetch('http://localhost:8080/messages', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
}

onMounted(() => {
    setEvtSource()
    broadcastJoin()
})

watch(evtSource, () => {
    if (evtSource.value) {
        evtSource.value.onmessage = (e: MessageEvent) => {
            clearTimeout(timeout.value)
            const data = JSON.parse(e.data)
            messageData.value = data
            timeout.value = setTimeout(() => {
                messageData.value = undefined
            }, 2000)
        }
        evtSource.value.onerror = (err: MessageEvent) => {
            console.error("event source failed", err)
        }
    }
})

</script>

<style scoped></style>