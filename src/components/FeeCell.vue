<template>
        <td :class ="[{'isPaid' : isPaidValue},{'non-data' : !isPaidValue && feeTableType == 'select'},{'have-data' : isPaidValue && feeTableType =='select'}]" @click = "onClickFeeCell">   
        </td>
</template>
<script setup>
import { useFeeStore } from '@/store/fee';
import { inject, onMounted, ref } from 'vue';

const props = defineProps({
    isPaid : Boolean,
    month : Number,
    userId : Number,
    feeData : Object,
})

const emit = defineEmits(['checkCell'])
const openModal = inject("openModal");
const {addFeeData,deleteFeeData,getFeeTableType,setSelectFee} = useFeeStore();
const isPaidValue = ref(props.isPaid)
const feeTableType = ref(getFeeTableType());
const onClickFeeCell = () => {
    feeTableType.value = getFeeTableType();
    if(feeTableType.value == "select" && isPaidValue.value){
        setSelectFee(props.feeData);
        openModal.value = true;
    }
    else if(feeTableType.value == "update"){
        if(isPaidValue.value){
        deleteFeeData(props.userId,props.month)
        isPaidValue.value = false
        emit('checkCell')
    }
        else{
            addFeeData(props.userId,props.month);
            isPaidValue.value = true
            emit('checkCell')
        }
    }
}

</script>
<style lang="css" scoped>
    .isPaid{
        background-color: rgb(191, 248, 255);
    }
    td{
        cursor: pointer;
    }
    .non-data{
        cursor:default;
    }
    .have-data:hover{
        background-color: rgb(151, 243, 255);
    }
</style>