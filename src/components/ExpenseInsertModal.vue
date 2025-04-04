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
                    <th>지출내용</th>
                    <td><input v-model="expenseInfo.content" type="text"></td>
                </tr>
                <tr>
                    <th>금액</th>
                    <td><input v-model="expenseInfo.cost" type="number"></td>
                </tr>
                <tr>
                    <th>사진</th>
                    <td>
                        <ImageInput></ImageInput>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="insertExpenseButton">등록</button>
        <button @click="open = false">닫기</button>
    </div>
</template>

<script setup>
import { insertExpense } from '@/api/api';
import { inject, provide, ref, watch } from 'vue';
import ImageInput from './ImageInput.vue';
const open = inject("openInsertModal")
const fetchInit = inject("fetchInit");
const expesneImageInfo = ref([]);

provide("expenseImageInfo",expesneImageInfo)
watch(open, (newValue) => {
    if (newValue) {
    }
});

const expenseInfo = ref({})

const insertExpenseButton = async () => {
    const response = await insertExpense(expenseInfo.value,expesneImageInfo.value);
    open.value = false;
    fetchInit();
    alert(response.message);
    console.log(response);
}


</script>

<style scoped>
.modal {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 600px;
    margin-left: -300px;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgb(249, 249, 249)
}

.modal button {
    width: 100%;
}
.expense-table {
    width: 100%;
    border-collapse: collapse;
}

.expense-table th {
    padding: 8px;
}

.expense-table td {
    padding: 8px;
}

.expense-table input {
    width: 100%;
}
</style>