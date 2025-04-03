import { getAllExpense,  getExpenseByDate, getExpenseImage } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExpenseStore = defineStore('expense',() => {
    const expenseData = ref([]);
    const expenseImageData = ref([
    ]);

    const getExpenseData = async() =>{
        const response = await getAllExpense();
        expenseData.value = response.data;
        return expenseData.value
    }

    const getExpenseImageData = async() => {
        const response = await getExpenseImage();
        expenseImageData.value = response.data;
        return expenseImageData.value;
    }
    const getExpenseDataByDate = async(request) => {
        const response = await getExpenseByDate(request);
        expenseData.value = response.data;
        return expenseData.value
    }

    const getImagesByExpenseId = (expenseId) => {
        return expenseImageData.value.filter((data) => data.expenseId == expenseId)
    }
    return { getExpenseData , getExpenseDataByDate , getImagesByExpenseId ,getExpenseImageData}
})