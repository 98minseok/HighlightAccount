<template>
    <div class ="feetable-button-div">
        <button @click ="saveFeeDataTable">저장</button>
        <button @click ="renewFeeDataTable">되돌리기</button>
        <button @click ="toggleFeeTable">{{ feeTableType == "select" ? "수정하기" : "조회하기" }}</button>
    </div>
    <h1>2025년도</h1>
    <div class ="feetable-div">
    <table class ="feetable">
        <thead>
            <tr>
                <th>이름</th>
                <th v-for="num in 12">
                    {{ num }}월
                </th>
                <th>합계</th>
            </tr>
        </thead>
        <tbody :key = "forceRenew">
            <FeeRow v-for="user in userData" :key="user.userId" :user="user" />
        </tbody>
    </table>
    </div>
    <FeeInfoModal></FeeInfoModal>
</template>

<script setup>
import { onMounted, provide, ref } from 'vue';
import FeeRow from './FeeRow.vue';
import { useFeeStore } from '@/store/fee';
import FeeInfoModal from './FeeInfoModal.vue';
defineProps({
    userData : Array
})
const forceRenew = ref(0);
const {renewFeeData , saveFeeData , toggleFeeType , getFeeTableType} = useFeeStore();
const feeTableType = ref("");
const openModal = ref(false);
provide("openModal",openModal)

onMounted(() => {
    feeTableType.value = getFeeTableType();
})

const toggleFeeTable = () => {
    toggleFeeType();
    feeTableType.value = getFeeTableType();
    forceRenew.value += 1;
}
const renewFeeDataTable = async() => {
    if(confirm("작업을 취소하시겠습니까 ?")){
        await renewFeeData();
        forceRenew.value = forceRenew.value + 1;
        alert("취소되었습니다.");
    }


}   

const saveFeeDataTable = async() =>{
    if(confirm("작업을 저장하시겠습니까 ?")){
        await saveFeeData();
        alert("저장되었습니다.")
    }

}

</script>

<style scoped>
    .feetable-button-div{
        display:flex;
        width:100%;
        justify-content: flex-end;
        align-items: center;
        gap : 20px;
        margin-bottom : 10px;
    }
    .feetable-button-div button{
        width : 5vw;
        padding : 0.3vw;
    }
    .feetable-div{
        height : 100%;
        width : 100%;
        overflow: scroll;
    }
    @media screen and (max-width: 1439px) {
    .feetable{
        width : 1000px;
    }
    }

</style>
