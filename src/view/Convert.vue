<template>
    <div class ="convert-main">
        <div class ="convert-main-logo">
            사용자 전환
        </div>
        <div class ="convert-select-div">
            <RouterLink to="/test"><div class ="convert-select"><img src ="../assets//image/select_user.jpg"><span>사용자</span></div></RouterLink>
            <RouterLink to="/fee"><div class ="convert-select"><img src ="../assets//image/select_manager.jpg"><span>관리자</span></div></RouterLink>
        </div>
    </div>
</template>
<script setup>
</script>

<style lang="css" scoped>
    .convert-main{
        display: flex;
        flex-direction: column;
        text-align: center;
        gap:20px;
    }
    .convert-main-logo{
        font-size : 3vw;
    }
    .convert-select-div{
        display:flex;
        width:100%;
        height:100%;
        align-items: center;
        justify-content: center;
        gap : 5vw;

    }
    .convert-select{
        display: flex;
        justify-content: center;
        width: 25vw;
        height : 25vw;
        border : 1px solid black;
        border-radius: 10px;
        position : relative;
        box-sizing: border-box; 
        transition: all 200ms ease-in-out;
    }
    .convert-select span{
        color : black;
        text-decoration-line: none;
        font-size : 3vw;
    }
    .convert-select img{
        display : inline-block;
        position : absolute;
        content : "";
        width:100%;
        height:100%;
        border-radius: inherit;
        object-fit:scale-down;
        z-index: -1;
    }
    .convert-select:hover{
        border : 5px solid aqua;
    }
</style>