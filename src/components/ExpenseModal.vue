<template>
    <div v-if="open" class="modal">
        <h2>등록하기</h2>
        <table class ="expense-table">
            <tbody>
                <tr>
                    <th>일시</th>
                    <td><input v-model="expenseInfo.date" type="date"></td>
                </tr>
                <tr>
                    <th>유형</th>
                    <td><select style="width:100%" v-model="expenseInfo.type">  
                        <option value ="expense">
                            지출
                        </option>
                        <option value ="insert">
                            입금
                        </option>
                    </select></td>
                </tr>
                <tr>
                    <th>{{expenseInfo.type == "expense" ? '지출' : '입금'}}내용</th>        
                    <td><input v-model="expenseInfo.content" type="text"></td>
                </tr>
                <tr>
                    <th>금액</th>
                    <td><input v-model="expenseInfo.cost" type="number"></td>
                </tr>
                <tr >
                    <th>사진</th>
                    <td>
                        <ImageInput></ImageInput>
                        <ImageSlide v-if="imageData.length" :imageData="imageData"></ImageSlide>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="insertExpenseButton">수정</button>
        <button @click="clickDeleteButton">삭제</button>
        <button @click="open = false">확인</button>
    </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue';
import ImageSlide from './ImageSlide.vue';
import { useExpenseStore } from '@/store/expense';
import { deleteExpense } from '@/api/api';
import ImageInput from './ImageInput.vue';
const open = inject("openModal")
const props = defineProps({
    imageData : Array,
    expenseInfo : Object,
})
const clickDeleteButton = () => {
    deleteExpense(props.expenseInfo.id);
}

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
  width: 30vw;
  margin-left: -15vw;
  height:80vh;
  overflow-y: scroll;
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