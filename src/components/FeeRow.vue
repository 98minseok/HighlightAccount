<template>
        <tr>
        <td align="center" :class ="user.activeType =='비활동' ? 'unactiveMember' : ''">{{ user.name }}</td>
        <template v-if="feeDataValidation">
            <FeeCell @checkCell = "renewData" v-for="num in 12" :feeData="cellFeeData(num)" :userId="user.id" :month = "num" :isPaid="checkIsPaid(num)" :amount ="user.activeType =='비활동' ? 10000 : 15000"></FeeCell>
        </template>
        <td align ="center">{{ totalCost.toLocaleString()}}</td>
    </tr>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
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
const totalCost = computed(() => feeData.value.reduce((acc,cur) =>acc+= cur.amount ,0));
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
.unactiveMember{
    background-color: beige;
}
</style>