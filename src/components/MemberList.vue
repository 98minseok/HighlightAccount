<template>
    <div class ="memberlist-main">
    <table class ="memberlist-table">
        <thead>
            <tr class ="memberlist-tr">
                <th class ="memberlist-th">아이디</th>
                <th class ="memberlist-th">이름</th>
                <th class ="memberlist-th">등번호</th>
            </tr>
        </thead>
        <tbody>
            <tr class ="memberlist-tr" v-for ="member in memberList" :key = "member.id">
                <td class ="memberlist-td">{{ member.id }}</td>
                <td class ="memberlist-td">{{ member.name }}</td>
                <td class ="memberlist-td">{{ member.backNumber }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>
<script setup>
import { useUserStore } from '@/store/user';
import { onMounted, ref } from 'vue';

    const memberList = ref()
    const {getUserData} = useUserStore();
    onMounted(async() => {
        memberList.value = await getUserData()
    })


</script>
<style scoped>
    .memberlist-main{
        display: flex;
        width: 100%;
        padding : 50px;
        align-items: center;
        justify-content: center;
    }
    .memberlist-table,
    .memberlist-tr,
    .memberlist-td,
    .memberlist-th{
        border-collapse: collapse;
    }
    .memberlist-td{
        padding : 20px;
        text-align: center;
    }
</style>