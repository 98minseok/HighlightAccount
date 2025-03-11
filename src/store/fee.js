import { getAllFeePayments } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFeeStore = defineStore('fee',() => {
    const feeData = ref([]);
    

    const renewFeeData = async() => {
        feeData.value =  await getAllFeePayments();
    }
    renewFeeData();
    const getFeeData = (user) => {
        return feeData.value.filter((e) => e.userId == user)
    }
    
    const addFeeData = (user,month) => {
        feeData.value.push({
            id : feeData.value.length + 1,
            userId : user,
            month : month
        })

        console.log(feeData.value);
    }

    const deleteFeeData = (user,month) => {
        feeData.value = feeData.value.filter((e) => !(e.userId == user && e.month == month))

        console.log(feeData.value);
    }
    return { getFeeData , addFeeData , deleteFeeData , renewFeeData }
})