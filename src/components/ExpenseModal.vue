<template>
    <div v-if="open" class="modal">
        <h2>납부정보</h2>
        <ImageSlide :imageData="imageData"></ImageSlide>
      <button @click="open = false">닫기</button>
    </div>
  </template>

<script setup>
import { inject, watch } from 'vue';
import ImageSlide from './ImageSlide.vue';
const open = inject("openModal")
const props = defineProps({
    imageData : Array,
})
console.log(props.imageData);
watch(open, (newValue) => {
    if (newValue) {
    }
});


</script>

<style scoped>
.modal {
  position: fixed;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap : 10px;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 400px;
  margin-left : -200px;
  padding : 20px;
  box-sizing: border-box;
  background-color: rgb(249, 249, 249)
}
.modal button{
    width : 100%;
}
.modal-div{
    display: flex;
}
.modal-div ul{
    list-style-type: none;
    height:100%;
}

.modal-div li{
    padding : 10px;
    min-height: 100px;
    max-height: 100px;
    border : 1px solid black;
    border-collapse: collapse;
}
</style>