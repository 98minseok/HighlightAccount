<template>
    <div v-if="open" class="modal">
        <h2>납부정보    </h2>
        <div class ="modal-div">
            <ul>
                <li>
                    아이디
                </li>
                <li>
                    이름
                </li>
                <li>
                    납입 일자
                </li>
                <li>
                    금액
                </li>
            </ul>
            <ul>
                <li>
                    {{ selectFeeData.memberId }}
                </li>
                <li>
                    {{ selectFeeData.memberName || "이름없음" }}
                </li>
                <li>
                    {{ selectFeeData.feeDate }}
                </li>
                <li>
                    {{ selectFeeData.amount.toLocaleString() }}
                </li>
            </ul>
        </div>
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
.modal-div{
    display: flex;
}
.modal-div ul{
    list-style-type: none;
}

.modal-div li{
    padding : 10px;
    border : 1px solid black;
    border-collapse: collapse;
}
</style>