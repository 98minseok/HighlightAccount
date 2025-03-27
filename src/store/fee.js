import { getAllFeePayments, updateFeeInfo } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFeeStore = defineStore('fee',() => {
    const feeData = ref([]);
    const feeTableType = ref("select");
    const selectFeeData = ref({});
    const selectYear = ref(new Date().getFullYear());
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
            month : month,
            year : selectYear.value
        })
        feeUpdateList = feeUpdateList.filter((e) => !(e.memberId == memberId && e.month == month && e.year === selectYear.value));
        feeUpdateList.push({
            memberId : memberId,
            month : month,
            year : selectYear.value,
            type : "add"
        })
        console.log(feeUpdateList);
    }

    const deleteFeeData = (memberId,month) => {
        feeData.value = feeData.value.filter((e) => !(e.memberId == memberId && e.month == month && e.year === selectYear.value))
        feeUpdateList = feeUpdateList.filter((e) => !(e.memberId == memberId && e.month == month && e.year === selectYear.value));
        feeUpdateList.push({
            memberId : memberId,
            month : month,
            year : selectYear.value,
            type : "delete"
        })
        console.log(feeUpdateList);
    }

    const saveFeeData = async() => {
        const response = await updateFeeInfo(feeUpdateList);
        renewFeeData();
    }

    const toggleFeeType = () => {
        if(feeTableType.value == "select"){
            feeTableType.value = "update"
        }
        else{
            if(feeUpdateList.length > 0){
                alert("수정중인 작업이 있습니다. 마무리 하고 다시 시도해주세요.")
                return;
            }
            feeTableType.value = "select"
        }
    }

    const getFeeTableType = () => {
        return feeTableType.value;
    }

    const setSelectFee = (value) => {
        selectFeeData.value = value;
    }

    const getSelectFee = () => {
        return selectFeeData.value;
    }
    return { getFeeData , addFeeData , deleteFeeData , renewFeeData ,saveFeeData , toggleFeeType , getFeeTableType , setSelectFee , getSelectFee, selectFeeData}
})