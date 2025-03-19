import { getAllFeePayments, updateFeeInfo } from "@/api/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useExpenseStore = defineStore('expense',() => {
    const expenseData = ref([
        {"date": "2025-03-01", "content": "식료품 구입", "cost": 50000, "balance": 950000},
        {"date": "2025-03-02", "content": "전기 요금", "cost": 70000, "balance": 880000},
        {"date": "2025-03-03", "content": "교통비", "cost": 20000, "balance": 860000},
        {"date": "2025-03-04", "content": "외식", "cost": 45000, "balance": 815000},
        {"date": "2025-03-05", "content": "인터넷 요금", "cost": 35000, "balance": 780000},
        {"date": "2025-03-06", "content": "옷 구입", "cost": 120000, "balance": 660000},
        {"date": "2025-03-07", "content": "영화 관람", "cost": 30000, "balance": 630000},
        {"date": "2025-03-08", "content": "커피 구매", "cost": 5000, "balance": 625000},
        {"date": "2025-03-09", "content": "핸드폰 요금", "cost": 60000, "balance": 565000},
        {"date": "2025-03-10", "content": "책 구입", "cost": 25000, "balance": 540000},
        {"date": "2025-03-11", "content": "버스비", "cost": 1500, "balance": 538500},
        {"date": "2025-03-12", "content": "생일 선물", "cost": 80000, "balance": 458500},
        {"date": "2025-03-13", "content": "마트 장보기", "cost": 65000, "balance": 393500},
        {"date": "2025-03-14", "content": "택시비", "cost": 12000, "balance": 381500},
        {"date": "2025-03-15", "content": "넷플릭스 구독", "cost": 14500, "balance": 367000},
        {"date": "2025-03-16", "content": "헬스장 등록", "cost": 90000, "balance": 277000},
        {"date": "2025-03-17", "content": "간식 구매", "cost": 8000, "balance": 269000},
        {"date": "2025-03-18", "content": "수도 요금", "cost": 25000, "balance": 244000},
        {"date": "2025-03-19", "content": "기부", "cost": 30000, "balance": 214000},
        {"date": "2025-03-20", "content": "전자제품 수리", "cost": 50000, "balance": 164000}
    ]);

    const getExpenseData = () =>{
        return expenseData.value
    }

    return { getExpenseData }
})