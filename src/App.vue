<script setup>
import { onMounted, ref } from 'vue';
import FeeTable from './components/FeeTable.vue';
import { useUserStore } from './store/user';
import { RouterView } from 'vue-router';

const { getUserData } = useUserStore();
const userData = ref();
onMounted(async() => {
  userData.value = await(getUserData())
})

</script>

<template>
  <main>
    <RouterView></RouterView>
  </main>

</template>

<style scoped>
  main{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
  }
</style>
