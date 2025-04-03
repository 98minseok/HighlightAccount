<template>
    <div v-if="open" class="modal">
        <h2>납부정보    </h2>
        <table class="fee-table">
            <tbody>
                <tr>
            <th>아이디</th>
            <td>{{ selectFeeData.memberId }}</td>
        </tr>
        <tr>
            <th>이름</th>
            <td>{{ selectFeeData.memberName || "이름없음" }}</td>
        </tr>
        <tr>
            <th>납입 일자</th>
            <td>{{ selectFeeData.feeDate }}</td>
        </tr>
        <tr>
            <th>금액</th>
            <td>{{ selectFeeData.amount.toLocaleString() }}</td>
        </tr>
            </tbody>
    </table>
      <button @click="open = false">닫기</button>
    </div>
  </template>

<script setup>
import { useFeeStore } from '@/store/fee';
import { inject,ref, watch } from 'vue';
const open = inject("openModal")
const {getSelectFee} = useFeeStore();
const selectFeeData = ref({})

watch(open, (newValue) => {
    if (newValue) {
        selectFeeData.value = getSelectFee();
        console.log(selectFeeData.value);
    }
});


</script>

<style scoped>
.modal {
  position: fixed;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap : 10px;
  z-index: 999;     
  top: 20%;
  left: 50%;
  width: 400px;
  margin-left : -200px;
  padding : 20px;
  box-sizing: border-box;
  background-color: rgb(249, 249, 249)
}
.modal button{
    width : 100%;
}

.fee-table {
    width: 100%;
    border-collapse: collapse;
}

.fee-table th {
    padding: 8px;
    font-weight: bold;
}

.fee-table td {
    padding: 8px;
}
</style>