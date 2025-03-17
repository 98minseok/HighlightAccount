
import { getAllMembers } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user',() => {

    const userData = ref([
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
    const getUserData = async() => {
        return userData.value;
    }
    return { getUserData }
})