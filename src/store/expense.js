import { getAllExpense, getAllFeePayments, getExpenseByDate, updateFeeInfo } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExpenseStore = defineStore('expense',() => {
    const expenseData = ref([]);

    const getExpenseData = async() =>{
        const response = await getAllExpense();
        expenseData.value = response.data;
        return expenseData.value
    }

    const getExpenseDataByDate = async(request) => {
        const response = await getExpenseByDate(request);
        expenseData.value = response.data;
        return expenseData.value
    }

    return { getExpenseData , getExpenseDataByDate}
})