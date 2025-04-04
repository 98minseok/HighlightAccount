<template>
        <tr>
        <td align="center">{{ user.name }}</td>
        <template v-if="feeDataValidation">
            <FeeCell @checkCell = "renewData" v-for="num in 12" :feeData="cellFeeData(num)" :userId="user.id" :month = "num" :isPaid="checkIsPaid(num)"></FeeCell>
        </template>
        <td align ="center">{{ (feeData.length * 15000).toLocaleString()}}</td>
    </tr>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import FeeCell from './FeeCell.vue';
import { useFeeStore } from '@/store/fee';
// 부모로부터 user 데이터를 props로 받기
const props = defineProps({
    user: Object
});
const feeData = ref([])
const {getFeeData} = useFeeStore();
const feeDataValidation = ref(false)
const renewData = async() => {
    feeData.value = await getFeeData(props.user.id);
    feeDataValidation.value = true
}
const checkIsPaid = (month) => {
   return feeData.value.findIndex((e) => e.month == month) == -1 ? false : true
}

const cellFeeData = (month) => {
    return feeData.value.find((e) => e.month == month)
}
onMounted(async() => {
    await renewData();
})
</script>

<style scoped>
/* FeeRow 스타일 설정 */
</style>