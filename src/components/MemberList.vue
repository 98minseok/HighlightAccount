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
            <tr class ="memberlist-tr" v-for ="member in pagingList" :key = "member.id">
                <td class ="memberlist-td">{{ member.id }}</td>
                <td class ="memberlist-td">{{ member.name }}</td>
                <td class ="memberlist-td">{{ member.backNumber }}</td>
            </tr>
        </tbody>
    </table>
    <div class="memberlist-button-div">
        <button @click ="page = num-1" :class="num-1 == page ? 'active' : ''" v-for ="num in listSize">{{ num }}</button>
    </div>
    <div class="memberlist-button-div">
        <button v-if ="canPrevPage" @click="clickPrevPage">이전</button>

        <button v-if ="canNextPage" @click="clickNextPage">다음</button>
    </div>


    </div>
</template>
<script setup>
import { useUserStore } from '@/store/user';
import { computed, onMounted, ref } from 'vue';

    const memberList = ref([])    
    const page = ref(0)
    const pagingList = computed(() => (memberList.value.slice(page.value*10,page.value*10+10)))
    const {getUserData} = useUserStore();
    onMounted(async() => {
        memberList.value = await getUserData()
    })
    const listSize = computed(() => parseInt(memberList.value.length / 10))
    const canNextPage = computed(() => page.value < listSize.value - 1)
    const canPrevPage = computed(() => page.value > 0)

    const clickNextPage = () =>{
        if(canNextPage){
            page.value++;
        }
    }
    const clickPrevPage = () =>{
        if(canPrevPage){
            page.value--;
        }
    }
    


</script>
<style scoped>
    .memberlist-main{
        display: flex;
        flex-direction: column;
        flex : 1;
        width: 100%;
        overflow: scroll;
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
    .memberlist-button-div{
        display:flex;
        margin-top : 10px;
        gap:10px;
    }
    .memberlist-button-div button{
        padding : 10px;
        border-radius: 10px;
        cursor: pointer;
        border :none;
    }
    .memberlist-button-div .active{
        background-color: beige;
        outline: none;
        border: none;
    }
</style>