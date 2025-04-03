<template>
    <div class ="image-input-div">
        <input v-if="previewFiles.length == 0" @change="changeInput" type="file" accept="image/*" multiple>
        <img v-if="previewFiles.length" v-for="imageFile in previewFiles" :src="imageFile" class ="testImage">
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
    const imageFiles = inject("expenseImageInfo");
    const previewFiles = ref([]);
    const changeInput = (event) => {
        console.log(event.target.files)
        imageFiles.value = Array.from(event.target.files);
        previewFiles.value = imageFiles.value.map((e) => URL.createObjectURL(e));
    }
</script>

<style lang="css" scoped>
    .testImage{
        width:100px;
        height:100px;
        object-fit: contain ;
    }
    .image-input-div{
        display:flex;
    }
</style>