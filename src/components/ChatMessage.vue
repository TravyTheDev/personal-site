<template>
    <div class="self-end flex flex-col items-end max-w-[66%]" v-if="name && message.userID == userID">
            <p class="font-semibold text-sm">{{ message.name }}:</p>
            <p class="border border-orange-600 rounded-l-lg rounded-br-lg bg-orange-600 px-2 py-1 break-words w-full">{{
              message.body }}</p>
          </div>
          <div class="self-start max-w-[66%]" v-else>
            <p class="font-semibold text-sm">{{ message.name }}:</p>
            <p class="break-words w-full border border-sky-900 rounded-r-lg rounded-bl-lg bg-sky-900 px-2 py-1">{{
              message.body }}</p>
          </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { Message } from './Chat.vue';


interface props  {
    message: Message
    name: string
    userID: string
}

const props = defineProps<props>()

const emit = defineEmits(['remove'])

onMounted(() => {
    setTimeout(() => {
        emit('remove', props.message.messageID)
    }, 10000)
})
</script>

<style scoped>

</style>