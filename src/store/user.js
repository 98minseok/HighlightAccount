
import { getAllMembers } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user',() => {

    const userData = ref([])
    const getUserData = async() => {
        userData.value = await getAllMembers();
        return userData.value;
    }
    return { getUserData }
})