<template>
    <div class="date-container">
        <div class="date-div">
            <label for="start-date">시작날짜</label>
            <input v-model="startDate" type="date" id="start-date">
        </div>
        <div class="date-div">
            <label for="end-date">종료날짜</label>
            <input v-model="endDate" type="date" id="end-date">
        </div>
        <button type="button" @click="searchExpenseByDate">조회하기</button>
        <button type="button" @click="searchExpense">초기화</button>
        <button type="button" @click="insertExpense">등록하기</button>
    </div>
    <div class="expense-table-div">
        <table>
            <thead>
                <tr>
                    <th>일시</th>
                    <th>지출내용</th>
                    <th>금액</th>
                    <th>잔액</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="expense in expenseData" :key="expense.id">
                    <td>{{ expense.date }}</td>
                    <td style="width: 50vh;"><span class ="expense-table-content" @click ="clickContent(expense.id)">{{ expense.content }}</span></td>
                    <td>{{ expense.cost.toLocaleString() }}원</td>
                    <td>{{ expense.balance }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <ExpenseModal :imageData="imageData"></ExpenseModal>
    <ExpenseInsertModal></ExpenseInsertModal>
</template>

<script setup>
import { getExpenseByDate } from '@/api/api';
import { useExpenseStore } from '@/store/expense';
import { onMounted, provide, ref } from 'vue';
import ExpenseModal from './ExpenseModal.vue';
import ExpenseInsertModal from './ExpenseInsertModal.vue';

const startDate = ref("");
const endDate = ref("");
const expenseData = ref([]);
const {getExpenseData,getImagesByExpenseId,getExpenseImageData} = useExpenseStore();
const openImageModal = ref(false)
const openInsertModal = ref(false);
const imageData = ref([])

const clickContent = (expenseId) => {
    imageData.value = getImagesByExpenseId(expenseId);
    if(imageData.value.length > 0){
        openImageModal.value = true;
    }
}


const fetchInitialData = async () => {
    expenseData.value = await getExpenseData();
    await getExpenseImageData();
};

provide("fetchInit",fetchInitialData);
provide("openImageModal",openImageModal);
provide("openInsertModal",openInsertModal);

onMounted(fetchInitialData);

const searchExpense = async () => {
    await fetchInitialData();
    alert("초기화되었습니다.");
};

const insertExpense = async() => {
    openInsertModal.value = true;
}

const searchExpenseByDate = async () => {
    if (!startDate.value || !endDate.value) {
        alert("모든 값을 입력해주세요");
        return;
    }
    if (startDate.value > endDate.value) {
        alert("종료날짜가 시작날짜보다 먼저일 수 없습니다.");
        return;
    }

    try {
        const request = { startDate: startDate.value, endDate: endDate.value };
        const response = await getExpenseByDate(request);
        expenseData.value = response.data;
        alert("조회되었습니다.");
    } catch (error) {
        console.error("조회 중 오류:", error);
        alert("조회에 실패했습니다.");
    }
};
</script>

<style lang="css" scoped>
.expense-table-div {
    display: flex;
    justify-content: center;
    width: 100%;
    max-height: 80vh;
    overflow: scroll;
}
.date-container {
    display: flex;
    gap: 10px;
    width: 50vw;
}
.date-div {
    display: flex;
    flex-direction: column;
}
.date-container button {
    margin: auto 0;
}
.expense-table-content{
    cursor: pointer;
}
.expense-table-content:hover{
    color : rgb(185, 185, 185)
}
</style>