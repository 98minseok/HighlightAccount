<template>
    <div class ="top-row">    
        <h1>팀원 정보</h1>
        <button>회원 추가</button>
    </div>

    <div class ="memberlist-main">
    <table class ="memberlist-table">
        <thead>
            <tr class ="memberlist-tr">
                <th @click ="sortMemberList('id')" class ="memberlist-th">아이디 {{ sortMark('id') }}</th>
                <th @click ="sortMemberList('name')" class ="memberlist-th">이름 {{ sortMark('name') }}</th>
                <th @click ="sortMemberList('backNumber')" class ="memberlist-th">등번호 {{ sortMark('backNumber')}}</th>
                <th @click ="sortMemberList('email')" class ="memberlist-th">이메일 {{ sortMark('email') }}</th>
                <th @click ="sortMemberList('address')" class ="memberlist-th">주소 {{ sortMark('address') }}</th>
                <th @click ="sortMemberList('birthDate')" class ="memberlist-th">생일 {{ sortMark('birthDate')}}</th>
                <th>관리하기</th>
            </tr>
        </thead>
        <tbody>
            <tr class ="memberlist-tr" v-for ="member in pagingList" :key = "member.id">
                <td class ="memberlist-td">{{ member.id }}</td>
                <td class ="memberlist-td">{{ member.name }}</td>
                <td class ="memberlist-td">{{ member.backNumber }}</td>
                <td class ="memberlist-td">{{ member.email }}</td>
                <td class ="memberlist-td">{{ member.address }}</td>
                <td class ="memberlist-td">{{ member.birthDate }}</td>
                <td>
                    <div class ="td-button-div">
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class ="memberlist-search-div">
        <select v-model="searchType">
            <option value ="id">아이디</option>
            <option value ="name">이름</option>
        </select>
        <input  @keydown.enter="clickSearch" v-model ="searchValue" type ="text">
        <button @click ="clickSearch">검색</button>
        <button @click ="clickReset">초기화</button>
    </div>
    <div class="memberlist-button-div">
        <button @click ="page = num-1" :class="num-1 == page ? 'active' : ''" v-for ="num in listSize">{{ num }}</button>
    </div>
    <div class="memberlist-button-div">
        <button v-if ="canPrevPage" @click="clickPrevPage">이전</button>

        <button v-if ="canNextPage" @click="clickNextPage">다음</button>
    </div>
    </div>
    <button @click="exportArrayToExcel()">엑셀다운</button>
</template>
<script setup>
import { useUserStore } from '@/store/user';
import { computed, onMounted, ref } from 'vue';
import MemberModal from './MemberModal.vue';

    const memberList = ref([])
    const filteredMemberList = ref([]);
    const page = ref(0)
    const pagingList = computed(() => (filteredMemberList.value.slice(page.value*10,page.value*10+10)))
    const searchType = ref("id")
    const searchValue = ref("")
    const sortedType = ref("");
    const {getUserData} = useUserStore();
    onMounted(async() => {
        memberList.value = await getUserData()
        filteredMemberList.value = memberList.value;
    })
    const listSize = computed(() => parseInt(filteredMemberList.value.length / 10))
    const canNextPage = computed(() => page.value < listSize.value - 1)
    const canPrevPage = computed(() => page.value > 0)
    const clickSearch = () => {
        page.value = 0;
        filteredMemberList.value = memberList.value.filter((e) => e[searchType.value].includes(searchValue.value))
    }
    const clickReset = () => {
        page.value = 0;
        filteredMemberList.value = memberList.value;
    }
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
    const sortMemberList = (type) => {
        console.log(type);
        if((sortedType.value.includes(type) && sortedType.value.includes("desc"))){
            filteredMemberList.value = filteredMemberList.value.sort((a,b) => compareValue(a[type],b[type]))
            sortedType.value = type + "asc"
        }
        else{
            filteredMemberList.value = filteredMemberList.value.sort((a,b) => compareValue(b[type],a[type]))
            sortedType.value = type + "desc"
        }
    }

    const compareValue = (a,b) => {
        if(typeof a == "string"){
            return a > b ? 1 : -1
        }
        else return a - b
    }

    const sortMark = (type) => {
        return sortedType.value.includes(type) ? sortedType.value.includes('asc') ? '▲' : '▼' : '' 
    }

    function exportArrayToExcel() {
            // 헤더 추출 (객체의 키를 헤더로 사용)
            const headers = Object.keys(memberList.value[0]);
            let csvContent = headers.map(h => `"${h}"`).join(",") + "\n";

            // 데이터 행 추가
            memberList.value.forEach(item => {
                const row = headers.map(header => {
                    let value = item[header] !== undefined ? item[header] : "";
                    return `"${String(value).replace(/"/g, '""')}"`; // 쌍따옴표 처리
                }).join(",");
                csvContent += row + "\n";
            });

            // UTF-8 BOM 추가 (한글 깨짐 방지)
            const BOM = "\uFEFF";
            const csvData = BOM + csvContent;
            console.log(csvContent);
            // Blob 생성 및 다운로드
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            
            link.setAttribute("href", url);
            link.setAttribute("download", "array_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }


</script>
<style scoped>
    .memberlist-main{
        display: flex;
        flex-direction: column;
        width: 100%;
        padding : 50px;
        align-items: center;
        justify-content: center;
    }
    .memberlist-table{
        height:100vh;
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
    .memberlist-button-div button:hover{
        background-color: beige;
    }
    .memberlist-button-div .active{
        background-color: beige;
    }
    .memberlist-search-div{
        display:flex;
        gap: 10px;
        margin-top : 10px;
    }
    .memberlist-search-div *{
        padding : 0.5vw;
    }
    .memberlist-tr th{
        cursor: pointer;
    }
    .td-button-div{
        display: flex;
        width:100%;
        height:100%;
        align-items: center;
        justify-content: center;
        gap:20px;
    }
    .td-button-div button{
        padding:0px 10px;
    }
    .top-row{
        display:flex;
        align-items: center;
        justify-content: space-between;
    }
    .top-row button{
        padding : 0px 10px;
    }
</style>