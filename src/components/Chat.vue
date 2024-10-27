<template>
  <div class="mx-2">
    <div class="w-full text-right">
      <button @click="toggleChat" class="bg-zinc-500 text-white px-2">
        {{ isOpen ? 'Close chat' : 'Open chat' }}
      </button>
    </div>
    <div v-if="isOpen"
      class="relative h-[75vh] mb-4 flex flex-col border overflow-y-hidden mx-auto max-w-screen-sm bg-zinc-700 text-white">
      <div ref="chatBody" class="mx-2 h-[80vh] pb-4 overflow-y-auto chat-body whitespace-pre-line">
        <div class="flex flex-col mx-2" v-for="message in messages">
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
        </div>
      </div>
      <div v-if="conn && name" class="w-full bg-zinc-800 border-t border-white">
        <div class="bg-zinc-800 py-2 flex gap-2 max-w-screen-sm mx-2 text-nowrap">
          <textarea @input="resize" ref="textArea" rows="1"
            class="border rounded-sm w-full bg-zinc-800 my-0 py-2 overflow-y-hidden" v-model="sentMessage"></textarea>
          <button @click="send">SEND>></button>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
      </div>
      <EnterNameModal v-if="isShowEnterNameModal" @close-modal="toggleEnterNameModal" @send-name="setName" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import EnterNameModal from './EnterNameModal.vue';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    SERVER_URL: String,
    PORT: String,
})

const name = ref("")
const isOpen = ref(false)
const userID = uuidv4();
const isShowEnterNameModal = ref(true)

export type Message = {
  userID: string;
  name: string;
  body: string;
  messageID: string;
};

const messages = ref<Message[]>([]);
const sentMessage = ref("");
const chatBody = ref()
const textArea = ref()
const errorMessage = ref("")

const conn = ref();

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    messages.value.length = 0
  }
}

const setWebsocket = () => {
  conn.value = new WebSocket(
    `ws://${props.SERVER_URL}:${props.PORT}/chat`
  );
}

onMounted(() => {
  setWebsocket()
})

watch(conn, () => {
  if (conn.value) {
    conn.value.onmessage = (e: MessageEvent) => {
      displayMessage(e);
    };
  }
});

const send = () => {
  try {
    const message: Message = {
      userID: userID,
      name: name.value,
      body: sentMessage.value,
      messageID: uuidv4(),
    }
    conn.value.send(JSON.stringify(message));
    sentMessage.value = "";
    nextTick(() => {
      resize()
    })
  } catch (error: any) {
    errorMessage.value = "error sending message"
  }
};

const displayMessage = (e: MessageEvent) => {
  const data = JSON.parse(e.data);
  const message: Message = {
    userID: data.userID,
    body: data.body,
    name: data.name,
    messageID: data.messageID,
  }
  messages.value.push(message);
  scrollToBottom(data.userID)
  setTimeout(() => {
    removeMessage(message.messageID)
  }, 10000)
};

const removeMessage = (id: string) => {
  const filtered = messages.value.filter((item) => item.messageID !== id)
  messages.value = filtered
}

onUnmounted(() => {
  conn.value.close()
})

const scrollToBottom = (id: string) => {
  if (chatBody.value && (id === userID || chatBody.value.scrollTop + 5 > chatBody.value.scrollHeight - chatBody.value.clientHeight)) {
    nextTick(() => {
      chatBody.value.scrollTop = chatBody.value.scrollHeight
    })
  }
}

const resize = () => {
  textArea.value.style.height = 'auto'
  if (textArea.value.scrollHeight < 104) {
    textArea.value.style.height = textArea.value.scrollHeight + 'px'
  } else {
    textArea.value.style.height = '6.5rem'
  }
  if (textArea.value.scrollHeight > 40) {
    textArea.value.classList.add('expanded-text')
  } else {
    textArea.value.classList.remove('expanded-text')
  }
}

const toggleEnterNameModal = () => {
  isShowEnterNameModal.value = !isShowEnterNameModal.value
}

const setName = (value: string) => {
  name.value = value
  isShowEnterNameModal.value = false
}
</script>

<style scoped>
.chat-body {
  scroll-behavior: smooth;
}

.expanded-text {
  overflow-y: auto;
}
</style>