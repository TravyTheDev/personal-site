<template>
    <div>
        <div @click="emit('close-modal')"
            class="fixed text-black w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex flex-col px-8">
            <div @click.stop class="relative flex flex-col p-4 bg-white self-start m-auto top-0 bottom-0 w-auto">
                <img :src="image" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    image: String
})

const emit = defineEmits(['close-modal'])

</script>

<style scoped>

</style>