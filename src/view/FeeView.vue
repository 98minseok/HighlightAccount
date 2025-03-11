<script setup>
import { onMounted, ref } from 'vue';
import FeeTable from '@/components/FeeTable.vue';
import { useUserStore } from '@/store/user'; 

const { getUserData } = useUserStore();
const userData = ref();
onMounted(async() => {
  userData.value = await(getUserData())
})

</script>

<template>
    <FeeTable :userData = "userData"></FeeTable>
</template>

<style scoped>
</style>
