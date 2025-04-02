<template>
    <div v-if="open" class="modal">
        <h2>등록하기</h2>
        <div class ="modal-div">
            <ul>
                <li>
                    일시
                </li>
                <li>
                    지출내용
                </li>
                <li>
                    금액
                </li>
                <li>
                    사진
                </li>
            </ul>
            <ul class ="modal-div-input-ul">
                <li>
                    <input v-model="expenseInfo.date" type="date">
                </li>
                <li>
                    <input v-model="expenseInfo.content" type="text">
                </li>
                <li>
                    <input v-model="expenseInfo.cost" type="number">
                </li>
                <li>
                    사진
                </li>
            </ul>
        </div>
        <button @click="insertExpenseButton">등록</button>
      <button @click="open = false">닫기</button>
    </div>
  </template>

<script setup>
import { insertExpense } from '@/api/api';
import { inject, ref, watch } from 'vue';
const open = inject("openInsertModal")
watch(open, (newValue) => {
    if (newValue) {
    }
});

const expenseInfo = ref({})

const insertExpenseButton = async() => {
    const response = await insertExpense(expenseInfo.value)
    console.log(response);
}


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
  width: 600px;
  margin-left : -300px; 
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
}

.modal-div li{
    padding : 10px;
    min-height :60px;
    max-height: 80px;
    border : 1px solid black;
    border-collapse: collapse;
}

.modal-div-input-ul{
    width : 400px;
}
.modal-div-input-ul input{
    width : 100%;
}
</style>