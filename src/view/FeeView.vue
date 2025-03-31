<script setup>
import { onMounted, ref } from 'vue';
import FeeTable from '@/components/FeeTable.vue';
import { useUserStore } from '@/store/user'; 
import { useFeeStore } from '@/store/fee';

const { getUserData } = useUserStore();
const { getFeeData } = useFeeStore();
const userData = ref([]);
const feeData = ref([]);
onMounted(async() => {
  userData.value = await(getUserData())
})

</script>

<template>

  <div class ="fee-main">
    <h1>회비 납부 현황</h1>
      <FeeTable :userData = "userData"></FeeTable>
  </div>
</template>

<style scoped>
.fee-main{
  display:flex;
  flex:9;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding : 30px;
}
</style>
