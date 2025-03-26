import { getAllExpense, getAllFeePayments, getExpenseByDate, updateFeeInfo } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExpenseStore = defineStore('expense',() => {
    const expenseData = ref([]);
    const expenseImageData = ref([
        { id: 1, expenseId: 1, image: "/image01.jpg" },
        { id: 2, expenseId: 1, image: "/image02.jpg" }, // expenseId 1에 사진 추가
        { id: 3, expenseId: 2, image: "/image03.jpg" },
        { id: 4, expenseId: 2, image: "/image04.jpg" }, // expenseId 2에 사진 추가
        { id: 5, expenseId: 3, image: "/image05.jpg" },
        { id: 6, expenseId: 4, image: "/image06.jpg" },
        { id: 7, expenseId: 5, image: "/image07.jpg" },
        { id: 8, expenseId: 5, image: "/image08.jpg" }, // expenseId 5에 사진 추가
        { id: 9, expenseId: 6, image: "/image09.jpg" },
        { id: 10, expenseId: 7, image: "/image10.jpg" },
        { id: 11, expenseId: 8, image: "/image11.jpg" },
        { id: 12, expenseId: 9, image: "/image12.jpg" },
        { id: 13, expenseId: 10, image: "/image13.jpg" },
        { id: 14, expenseId: 11, image: "/image14.jpg" },
        { id: 15, expenseId: 12, image: "/image15.jpg" },
        { id: 16, expenseId: 13, image: "/image16.jpg" },
        { id: 17, expenseId: 14, image: "/image17.jpg" },
        { id: 18, expenseId: 15, image: "/image18.jpg" },
        { id: 19, expenseId: 16, image: "/image19.jpg" },
        { id: 20, expenseId: 17, image: "/image20.jpg" },
    ]);
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

    const getImagesByExpenseId = (expenseId) => {
        return expenseImageData.value.filter((data) => data.expenseId == expenseId)
    }
    return { getExpenseData , getExpenseDataByDate , getImagesByExpenseId}
})