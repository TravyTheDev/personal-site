<template>
  <div
    class="relative h-[75vh] mb-4 flex flex-col overflow-y-hidden mx-auto max-w-screen-sm bg-cyan-500 text-black">
    <div ref="chatBody" class="mx-2 h-[80vh] pb-4 overflow-y-auto chat-body whitespace-pre-line">
      <div class="flex flex-col mx-2" v-for="message in messages">
        <div class="self-end flex flex-col items-end max-w-[66%]" v-if="message.user === 'me'">
          <p class="font-semibold text-sm">{{ message.user }}:</p>
          <p class="border border-green-400 rounded-l-lg rounded-br-lg bg-green-400 px-2 py-1 break-words w-full">{{
            message.text }}</p>
        </div>
        <div class="self-start max-w-[66%]" v-else>
          <p class="font-semibold text-sm">AI:</p>
          <p v-html="markdown.render(message.text)" class="break-words w-full border border-neutral-200 rounded-r-lg rounded-bl-lg bg-neutral-200 px-2 py-1"></p>
        </div>
      </div>
    </div>
    <div class="w-full bg-neutral-200 border-t border-white">
      <div class="bg-neutral-200 py-2 flex gap-2 max-w-screen-sm mx-2 text-nowrap">
        <textarea ref="textArea" rows="1" class="border border-black rounded-sm w-full bg-neutral-200 my-0 py-2 overflow-y-hidden"
          v-model="userInput"></textarea>
        <button @click="toggleSubtractionProblem">SEND>></button>
        <p v-if="isShowError">{{ isShowError }}</p>
      </div>
    </div>
    <SubtractionProblem v-if="isShowSubtractionProblem" @close-modal="toggleSubtractionProblem" @send-vals="send" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import SubtractionProblem from './SubtractionProblem.vue';
import MarkdownIt from 'markdown-it';

const props = defineProps({
  SERVER_URL: String,
  PORT: String
})

const markdown = new MarkdownIt()

type ChatText = {
  user: string;
  text: string;
}

type NumVals ={
  firstNum: number;
  secondNum: number;
  difference: number;
}

const userInput = ref("")
const messages = ref<ChatText[]>([])
const isShowError = ref(false)
const textArea = ref()
const isShowSubtractionProblem = ref(false)

const toggleSubtractionProblem = () => {
  isShowSubtractionProblem.value = !isShowSubtractionProblem.value
}

const send = async (vals: NumVals) => {
  if (userInput.value.length === 0) {
    return
  }
  isShowSubtractionProblem.value = false
  try {
    const chatInput = {
      user: "me",
      text: userInput.value,
    }
    const messageForBot = {
      message: userInput.value,
      firstNum: vals.firstNum,
      secondNum: vals.secondNum,
      difference: vals.difference,
    }
    messages.value.push(chatInput)
    const data = await fetch(`http://${props.SERVER_URL}:${props.PORT}/chat_bot`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageForBot)
    })
    const chat = await data.json()
    const botInput = {
      user: "AI",
      text: chat.toString().replaceAll('```', '`')
    }
    messages.value.push(botInput)
    userInput.value = ""
    nextTick(() => {
      textArea.value.focus()
    })
  } catch (error) {
    isShowError.value = true
  }
}

</script>

<style scoped></style>