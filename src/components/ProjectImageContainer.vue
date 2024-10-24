<template>
    <div>
        <div class="bg-gray-800 p-4 rounded-lg mx-2 flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between">
            <div v-for="data in pmData" class="bg-gray-700 rounded-lg flex flex-col">
                <div>
                    <div @click="showImage(data.image)" class="md:w-[225px] h-[143px] hover:cursor-pointer">
                        <img
                            class="rounded-t-lg h-full w-full object-cover"
                            :src="data.image"
                        />
                    </div>
                    <div class="text-xl my-4 font-semibold text-gray-200">
                        <h3>{{data.title}}</h3>
                    </div>
                </div>
            </div>
        </div>
        <ImageHolder v-if="isShowModal" :image="imgSource" @close-modal="toggleModal" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { pmData } from "../projectManagementDataEN";
import ImageHolder from "./ImageHolder.vue";

const imgSource = ref("")
const isShowModal = ref(false)

const showImage = (source: string) => {
    imgSource.value = source
    toggleModal()
}

const toggleModal = () => {
    isShowModal.value = !isShowModal.value
}

</script>

<style scoped>

</style>