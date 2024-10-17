<template>
    <div class="relative py-2">
        <div class="flex w-full justify-between justify-center items-center font-semibold divide-x">
            <button class="w-full">Home</button>
            <button class="w-full">About</button>
            <button class="w-full">Products</button>
            <button class="w-full">Contact</button>
        </div>
        <p class="absolute translate-y-2 bottom-0 right-0 text-sm border-r border-b">{{ messageData?.msg }}</p>
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