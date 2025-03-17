<template>
    <div class ="feetable-button-div">
        <button @click ="saveFeeDataTable">저장</button>
        <button @click ="renewFeeDataTable">되돌리기</button>
    </div>
    <table>
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
</template>

<script setup>
import { ref } from 'vue';
import FeeRow from './FeeRow.vue';
import { useFeeStore } from '@/store/fee';
defineProps({
    userData : Array
})
const forceRenew = ref(0);
const {renewFeeData , saveFeeData} = useFeeStore();

const renewFeeDataTable = async() => {
    if(confirm("작업을 취소하시겠습니까? ?")){
        await renewFeeData();
    }
    forceRenew.value = forceRenew.value + 1;
}

const saveFeeDataTable = async() =>{
    if(confirm("작업을 저장하시겠습니까 ?")){
        await saveFeeData();
    }

}

</script>

<style>
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
    table,th,td{
        border-collapse: collapse;
        border : 1px solid black;
    }
    th,td{
        padding : 10px;
        width : 100px;
    }
</style>
