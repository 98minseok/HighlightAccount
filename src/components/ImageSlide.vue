<template>
    <div class="image-slide">
        <div v-if="!isLoaded">로딩 중...</div>
        <img v-show="isLoaded" :src="imageSrc" class="image-slide-img" @load="onImageLoad" @error="onImageError" />
    </div>
    <div class="image-slide-button-div">
        <button v-if="index > 0" @click="clickPrevPage"> < </button>
        <button v-if="index < imageData.length -1" @click="clickNextpage"> > </button>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    imageData: Array,
})
const index = ref(0);

const imageData = props.imageData ?? [];
const imageSrc = computed(() => `http://localhost:8080/${imageData[index.value].image}`);
const isLoaded = ref(false);

const clickPrevPage = () => {
    if (index.value > 0) {
        index.value--;
    }
}
const clickNextpage = () => {
    if (index.value < imageData.length - 1) {
        index.value++;
    }
}
const onImageLoad = () => {
    isLoaded.value = true;
};

const onImageError = () => {
    console.error('이미지 로드 실패');
    isLoaded.value = false;
};
</script>

<style lang="css" scoped>
.image-slide {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;
}

.image-slide-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.image-slide-button-div{
    display:flex;
}
</style>