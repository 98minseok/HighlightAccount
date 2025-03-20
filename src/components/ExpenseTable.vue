<template>
    <h1>2025년도</h1>
    <div class ="expensetable-div">
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
            <tr v-for ="expense in expenseData">
                <td>{{ expense.date }}</td>
                <td style="width: 50vh;">{{ expense.content }}</td>
                <td>{{ expense.cost }}</td>
                <td>{{ expense.balance }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script setup>
import { useExpenseStore } from '@/store/expense';
import { onMounted, ref } from 'vue';

    const {getExpenseData} = useExpenseStore();
    const expenseData = ref([]);
    onMounted(async() => {
        expenseData.value = await getExpenseData();
    })
</script>
<style lang="css" scoped>    
.expensetable-div{
    display:flex;
    justify-content: center;
    height : 100%;
    width : 100%;
    overflow: scroll;
}
</style>