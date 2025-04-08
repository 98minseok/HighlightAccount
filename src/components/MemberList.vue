<template>
    <div class ="top-row">    
        <h1>팀원 정보</h1>
        <button @click="onInsertMember = !onInsertMember">{{ onInsertMember ? "취소" : "회원 추가" }}</button>
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
            <tr v-if ="onInsertMember || onUpdateMember" align="center" class ="memberlist-tr">
                <td class ="memberlist-td"></td>
                <td class ="memberlist-td"><input type="text" v-model="newMember.name"></td>
                <td class ="memberlist-td"><input type="number" v-model="newMember.backNumber"></td>
                <td class ="memberlist-td"><input type="email" v-model="newMember.email"></td>
                <td class ="memberlist-td"><input type="text" v-model="newMember.address"></td>
                <td class ="memberlist-td"><input type="date" v-model="newMember.birthDate"></td>   
                <td style="width:150px;">
                    <div class ="td-button-div">
                        <button @click ="clickSaveMember">저장</button>
                    </div>
                </td>   
            </tr>
            <tr class ="memberlist-tr" v-for ="member in pagingList" :key = "member.id">
                <td class ="memberlist-td">{{ member.userId }}</td>
                <td class ="memberlist-td">{{ member.name }}</td>
                <td class ="memberlist-td">{{ member.backNumber }}</td>
                <td class ="memberlist-td">{{ member.email }}</td>
                <td class ="memberlist-td">{{ member.address }}</td>
                <td class ="memberlist-td">{{ member.birthDate }}</td>
                <td>
                    <div class ="td-button-div">
                        <button @click = "clickUpdateMember(member)">수정</button>
                        <button @click ="clickDeleteMember(member)">삭제</button>
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
        <button v-if ="isPrevPage" @click="clickPrevPage">이전</button>

        <button v-if ="isNextPage" @click="clickNextPage">다음</button>
    </div>
    </div>
    <button @click="exportArrayToExcel()">엑셀다운</button>
</template>
<script setup>
import { useUserStore } from '@/store/user';
import { computed, onMounted, ref } from 'vue';
import MemberModal from './MemberModal.vue';
import { deleteMember, insertMember, updateMember } from '@/api/api';

    const memberList = ref([])
    const filteredMemberList = ref([]);
    const page = ref(0)
    const pagingList = computed(() => (filteredMemberList.value.slice(page.value*10,page.value*10+10)))
    const searchType = ref("id")
    const searchValue = ref("")
    const sortedType = ref("");
    const {getUserData} = useUserStore();
    const onInsertMember = ref(false);
    const onUpdateMember = ref(false);
    const newMember = ref({
        id : "",
        name : "",
        backNumber : "",
        email : "",
        address : "",
        birthDate : "",
    });

    onMounted(async() => {
        memberList.value = await getUserData()
        filteredMemberList.value = memberList.value;
    })
    const listSize = computed(() => Math.ceil(filteredMemberList.value.length / 10))
    const isNextPage = computed(() => page.value < listSize.value - 1)
    const isPrevPage = computed(() => page.value > 0)
    const renewData = async() => {
        memberList.value = await getUserData()
        filteredMemberList.value = memberList.value; 
    }
    const clickSearch = () => {
        page.value = 0;
        filteredMemberList.value = memberList.value.filter((e) => e[searchType.value].includes(searchValue.value))
    }
    const clickReset = () => {
        page.value = 0;
        filteredMemberList.value = memberList.value;
    }
    const clickNextPage = () =>{
        if(isNextPage){
            page.value++;
        }
    }
    const clickPrevPage = () =>{
        if(isPrevPage){
            page.value--;
        }   
    }
    const sortMemberList = (type) => {
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

    const clickSaveMember = async() => {
        let response;
        if(onInsertMember.value){
            response = await insertMember(newMember.value);
            onInsertMember.value = false;
        }
        else if(onUpdateMember.value){
            response = await updateMember(newMember.value);
            onUpdateMember.value = false;
        }
        alert(response.message);
        await renewData();
    }

    const clickDeleteMember = async(member) => {
        const isConfirm = confirm(`${member.name}님의 정보를 삭제하시겠습니까?`)
        if(isConfirm){
            const response = await deleteMember(member);
            await renewData();
            alert(response.message);
        }
    }

    const clickUpdateMember = (member) => {
        newMember.value = member;
        onUpdateMember.value = true;
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
        overflow: scroll;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .memberlist-table{
        max-height:50vh;
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
    .memberlist-tr{
        height:50px;
    }
    .memberlist-tr th{
        cursor: pointer;
    }
    .memberlist-td{
        height:10px;
    }
    .td-button-div{
        display: flex;
        width:100%;
        height:100%;
        align-items: center;
        justify-content: center;
        overflow : hidden;
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