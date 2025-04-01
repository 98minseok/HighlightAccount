<template>
    <form class ="login-form">
        <input ref="idComponent" v-model ="inputId" type ="text" placeholder="ID">
        <input ref="pwdComponent" v-model ="inputPwd" type ="password" placeholder="Password">
        <input ref="pwdCheckComponent" v-model ="inputPwdCheck" type="password" placeholder ="Password Check">
        <button type="submit" @click.prevent="submitRegister">회원가입</button>
    </form>
</template>

<script setup>
import {insertUser} from '@/api/api';
import router from '@/router';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
    const inputId = ref('')
    const inputPwd = ref('')
    const inputPwdCheck = ref('');
    const idComponent = useTemplateRef("idComponent")
    const pwdComponent = useTemplateRef("pwdComponent")
    const pwdCheckComponent = useTemplateRef("pwdCheckComponent");
    const submitRegister = () => {
        if(inputId.value.trim() == ""){
            alert("아이디를 입력해주세요.")
            idComponent.value.focus()
        }
        else if(inputPwd.value.trim() == ""){
            alert("비밀번호를 입력해주세요.")
            pwdComponent.value.focus()
        }
        else if(inputPwdCheck.value.trim() ==""){
            alert("비밀번호 확인을 입력해주세요")
            pwdCheckComponent.value.focus()
        }
        else if(inputPwd.value != inputPwdCheck.value){
            alert("비밀번호가 서로 다릅니다.")
            pwdComponent.value.focus();
        }
        else{
            register();
        }
    }
    const register = async() => {
        const response = await insertUser(inputId.value,inputPwd.value);
        const status = response.status;
        const message = response.message;
        switch(status){
            case "SUCCESS":
                alert(message)
                router.push("/")
                break;
            case "CONFLICT":
                alert(message)
                idComponent.value.focus();
                break;
            default:
        }
    }

    onMounted(() =>{
        idComponent.value.focus();
    })

</script>

<style lang="css" scoped>
.login-form{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:20px;
}

.login-form > *{
    width:100%;
    padding : 10px;
}
</style>