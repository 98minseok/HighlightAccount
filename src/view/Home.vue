<template>
    <div class="home-main">
        <nav class ="home-nav">
            <ul class ="home-nav-list">
                    <RouterLink to="/"><li class ="home-nav-item">HOME</li></RouterLink>
                    <RouterLink to="fee"><li class ="home-nav-item">회비 납부 현황</li></RouterLink>
                    <RouterLink to="memberList"><li class ="home-nav-item">팀원 정보</li></RouterLink>
            </ul>
            <ul class ="home-nav-list">
                <RouterLink to ="login"><li class ="home-nav-item">Logout</li></RouterLink>
            </ul>
        </nav>
        <div class ="home-router">
            <RouterView>
            </RouterView>
        </div>
    </div>

</template>
<script setup>
</script>
<style lang="css" scoped>
    .home-main{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .home-nav{
        position : sticky;
        display:flex;
        justify-content: space-around;
        background-color: rgb(203, 255, 196);
        top:0px;
        display:flex;
        padding : 10px
    }
    .home-nav-list{
        list-style-type: none;
        display:flex;
    }
    .home-nav-item{
        padding : 15px;
        border-radius: 5px;
    }

    .home-nav-item:hover{
        background-color: rgb(160, 255, 148);
    }
    .home-router{
        height:100%;
        width: 100%;
    }

</style>