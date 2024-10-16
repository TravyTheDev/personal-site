<template>
    <div>
        NAVBAR
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';

const evtSource = ref()

const messageData = ref()

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
            const data = JSON.parse(e.data)
            messageData.value = data
        }
        evtSource.value.onerror = (err: MessageEvent) => {
            console.error("event source failed", err)
        }
    }
})

</script>

<style scoped></style>