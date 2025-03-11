<template>
    <button>저장</button>
    <button @click ="renewFeeDataTable">되돌리기</button>
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
const {renewFeeData} = useFeeStore();

const renewFeeDataTable = async() => {
    await renewFeeData();
    forceRenew.value = forceRenew.value + 1;
}

</script>

<style>
    table,th,td{
        border-collapse: collapse;
        border : 1px solid black;
    }
    th,td{
        padding : 10px;
        width : 100px;
    }
</style>
