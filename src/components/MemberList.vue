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
import { ref } from 'vue';

    const memberList = ref([
    { id: "als981209", name: "김민석", backNumber: 21 },
    { id: "jisoo901015", name: "한지수", backNumber: 7 },
    { id: "minho870423", name: "이민호", backNumber: 10 },
    { id: "suyeon950612", name: "박수연", backNumber: 15 },
    { id: "taehyun890801", name: "강태현", backNumber: 3 },
    { id: "eunji920307", name: "최은지", backNumber: 19 },
    { id: "junseo970514", name: "김준서", backNumber: 8 },
    { id: "hana880925", name: "오하나", backNumber: 12 },
    { id: "seojin930718", name: "윤서진", backNumber: 5 },
    { id: "dongwoo911130", name: "정동우", backNumber: 17 },
    { id: "yuna990202", name: "송유나", backNumber: 11 },
    { id: "kyungmin850619", name: "최경민", backNumber: 4 },
    { id: "soomin940828", name: "백수민", backNumber: 9 },
    { id: "jaewon960311", name: "황재원", backNumber: 14 },
    { id: "hyejin900504", name: "신혜진", backNumber: 6 },
    { id: "sanghoon880112", name: "김상훈", backNumber: 20 },
    { id: "miyoung971225", name: "장미영", backNumber: 13 },
    { id: "woojin910709", name: "이우진", backNumber: 2 },
    { id: "seoyeon980316", name: "문서연", backNumber: 18 },
    { id: "jihun860827", name: "박지훈", backNumber: 16 }
])
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