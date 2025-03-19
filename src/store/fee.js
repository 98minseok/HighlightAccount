import { getAllFeePayments, updateFeeInfo } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFeeStore = defineStore('fee',() => {
    const feeData = ref([]);
    const feeTableType = ref("select");
    let feeUpdateList = [];

    const renewFeeData = async() => {
        const response = await getAllFeePayments();
        feeData.value = response.data;
        feeUpdateList = [];
    }
    renewFeeData();
    const getFeeData = (memberId) => {
        return feeData.value.filter((e) => e.memberId == memberId)
    }
    
    const addFeeData = (memberId,month) => {
        feeData.value.push({
            id : feeData.value.length + 1,
            memberId : memberId,    
            month : month
        })
        feeUpdateList = feeUpdateList.filter((e) => !(e.memberId == memberId && e.month == month));
        feeUpdateList.push({
            memberId : memberId,
            month : month,
            type : "add"
        })
        console.log(feeUpdateList);
    }

    const deleteFeeData = (memberId,month) => {
        feeData.value = feeData.value.filter((e) => !(e.memberId == memberId && e.month == month))
        feeUpdateList = feeUpdateList.filter((e) => !(e.memberId == memberId && e.month == month));
        feeUpdateList.push({
            memberId : memberId,
            month : month,
            type : "delete"
        })
        console.log(feeUpdateList);
    }

    const saveFeeData = async() => {
        const response = await updateFeeInfo(feeUpdateList);
        console.log(response);
    }

    const toggleFeeType = () => {
        if(feeTableType.value == "select"){
            feeTableType.value = "update"
        }
        else{
            feeTableType.value = "select"
        }
    }

    const getFeeTableType = () => {
        return feeTableType.value;
    }
    return { getFeeData , addFeeData , deleteFeeData , renewFeeData ,saveFeeData , toggleFeeType , getFeeTableType}
})