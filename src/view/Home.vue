<template>
    <div class="home-main">
        <nav class="home-nav">
            <CustomButton class ="mobile-nav-button" style ="margin-bottom : 20px" @click="onClickOpenTab">메뉴</CustomButton>
            <ul class="home-nav-list" :class ="openMobileTab ? 'mobileMenu' : ''">
                <RouterLink active-class="home-nav-item-active" class="home-nav-item" to="main">
                    <li>HOME</li>
                </RouterLink>
                <RouterLink active-class="home-nav-item-active" class="home-nav-item" to="fee">
                    <li>회비 납부 현황</li>
                </RouterLink>
                <RouterLink active-class="home-nav-item-active" class="home-nav-item" to="memberList">
                    <li>팀원 정보</li>
                </RouterLink>
                <RouterLink active-class="home-nav-item-active" class="home-nav-item" to="expense">
                    <li>지출 내역</li>
                </RouterLink>
            </ul>
            <ul class="home-nav-list" :class ="openMobileTab ? 'mobileMenu' : ''">
                <RouterLink to="login">
                    <li class="home-nav-item">Logout</li>
                </RouterLink>
            </ul>
        </nav>
        <div class="home-router">
            <RouterView>
            </RouterView>
        </div>
    </div>

</template>
<script setup>
import CustomButton from '@/components/CustomButton.vue';
import { ref } from 'vue';

    const openMobileTab = ref(true);
    const onClickOpenTab = () => {
        openMobileTab.value = !openMobileTab.value;
    }
    window.addEventListener('scroll', () => {
        let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
        const homeNav = document.querySelector(".home-nav");
        

        // 스크롤이 내려가면 nav-bar의 클래스 추가
        if(scrollLocation > 50){
            if(!homeNav.classList.contains("home-nav-scrolled")){
                homeNav.classList.add("home-nav-scrolled")
            }
        }
        else{
            if(homeNav.classList.contains("home-nav-scrolled")){
                homeNav.classList.remove("home-nav-scrolled")
            }
        }
    })
</script>
<style lang="css" scoped>
.home-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}
.mobileMenu{
    display:none;
}
.mobile-nav-button{
    display:none;
}
.home-nav {
    position: sticky;
    display: flex;
    justify-content: space-around;
    background-color: white;
    top: 0px;
    z-index: 100;
    display: flex;
    padding: 10px;
}
.home-nav-scrolled{
    border-bottom : 1px solid rgb(206, 206, 206);
}
.home-nav-list {
    list-style-type: none;
    display: flex;
    gap: 10px;
}

.home-nav-item {
    padding: 15px;
    border-radius : 50px;
}

.home-nav-item:hover {
    background-color: rgb(219, 219, 219);
}

.home-nav-item-active {
    background-color: black;
    color: white;
}

.home-nav-item-active:hover{
    background-color: black;
    color: white;
}

.home-router {
    height: 90vh;
    padding : 3vw 20vw;
    width: 100%;
}

@media screen and (max-width : 1440px) {
    .home-router {
    padding : 3vw 5vw;
}

@media screen and (max-width : 600px) {
    .home-nav{
        flex-direction: column;
    }
    .home-nav-list{
        flex-direction: column;
        display:none;
    }
    .mobileMenu{
        display: flex;
    }
    .mobile-nav-button{
        display:block;
    }
}
}

</style>