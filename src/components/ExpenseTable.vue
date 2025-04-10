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
        <div class="date-button-div">
            <CustomButton @click="searchExpenseByDate">조회하기</CustomButton>
            <CustomButton type="button" @click="searchExpense">초기화</CustomButton>
            <CustomButton type="button" @click="insertExpense">등록하기</CustomButton>
        </div>
    </div>
    <div class ="account-info-div">
        <h1>회비 총액</h1>
        <h1>지출 금액</h1>
        <h1>잔액</h1>
    </div>
    <div v-if="accountInfo" class ="account-info-div">
        <h1>{{accountInfo.totalFee.toLocaleString()}}</h1>
        <h1>{{ accountInfo.totalCost.toLocaleString()}}</h1>
        <h1>{{ (accountInfo.totalFee - accountInfo.totalCost).toLocaleString()}}</h1>
    </div>
    <div class="expense-table-div">
        <table>
            <thead>
                <tr>
                    <th>일시</th>
                    <th>타입</th>
                    <th>내용</th>
                    <th>금액</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="expense in expenseData" :key="expense.id" :class ="expense.type == 'expense' ? 'expense-row' : 'insert-row'">
                    <td>{{ expense.date }}</td>
                    <td>{{ expense.type == "expense" ? '지출' : '입금'}}</td>
                    <td style="width: 50vw;"><span class ="expense-table-content" @click ="clickContent(expense.id)">{{ expense.content }}</span></td>
                    <td>{{ expense.cost.toLocaleString() }}원</td>
                </tr>
            </tbody>
        </table>
    </div>
    <ExpenseModal :expenseInfo="expenseInfo" :imageData="imageData"></ExpenseModal>
    <ExpenseInsertModal></ExpenseInsertModal>
</template>

<script setup>
import { getAccountInfo, getExpenseByDate } from '@/api/api';
import { useExpenseStore } from '@/store/expense';
import { onMounted, provide, ref } from 'vue';
import ExpenseModal from './ExpenseModal.vue';
import ExpenseInsertModal from './ExpenseInsertModal.vue';
import CustomButton from './CustomButton.vue';

const startDate = ref("");
const endDate = ref("");
const expenseData = ref([]);
const {getExpenseData,getImagesByExpenseId,getExpenseImageData,setExpenseModalData} = useExpenseStore();
const openImageModal = ref(false)
const openInsertModal = ref(false);
const imageData = ref([])
const accountInfo = ref(null);
const expenseInfo = ref({});
const clickContent = (expenseId) => {
    imageData.value = getImagesByExpenseId(expenseId);
    expenseInfo.value = expenseData.value.find((e)=> e.id == expenseId);
    openImageModal.value = true;
}


const fetchInitialData = async () => {
    expenseData.value = await getExpenseData();
    const response = await getAccountInfo();
    accountInfo.value = response.data;
    console.log(accountInfo.value);
    await getExpenseImageData();
};

provide("fetchInit",fetchInitialData);
provide("openModal",openImageModal);
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
.date-button-div{
    display: flex;
    width:100%; 
    gap: 10px;
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
.account-info-div{
    display:flex;
    justify-content: center;
    gap : 50px;
}
.expense-row{
    background-color: rgb(255, 169, 169);
}
.insert-row{
    background-color: rgb(233, 255, 201);
}
@media screen and (max-width : 1440px){
.date-container {
    flex-direction: column;
    width:100%;
    align-items: center;
    margin-bottom : 20px;
}
.date-div{
    width:100%;
}
}
</style>