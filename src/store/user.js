import { getAllMembers } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user',() => {

    const userData = ref([
    ])
    const getUserData = async() => {
        const response = await getAllMembers();
        userData.value = response.data;
        console.log(userData.value);    
        return userData.value;
    }
    return { getUserData }
})