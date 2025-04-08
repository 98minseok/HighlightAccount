<template>
    <div v-if="open" class="modal">
        <h2>지출정보</h2>
        <ImageSlide :imageData="imageData"></ImageSlide>
      <CustomButton @click="open = false">닫기</CustomButton>
    </div>
  </template>

<script setup>
import { inject, watch } from 'vue';
import ImageSlide from './ImageSlide.vue';
import CustomButton from './CustomButton.vue';
const open = inject("openImageModal")
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
  width: 20vw;
  margin-left: -10vw;
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