<template>
    <div class="calendar-container">

        <table class="calendar-table">
            <thead>
                <tr>
                    <th v-for="day in weekdayNames" :key="day">
                        {{ day }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(week, index) in calendarWeeks" :key="index">
                    <td 
                        v-for="day in week" 
                        :key="day?.value"
                        :class="{ 'calendar-day-active': day?.value === today }"
                    >
                        {{ day?.value || '' }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 상수 정의
const DAYS_IN_WEEK = 7
const MAX_CALENDAR_DAYS = 42
const weekdayNames = ['일', '월', '화', '수', '목', '금', '토']

// 현재 날짜 정보
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() // 0-based
const today = currentDate.getDate()

// 날짜 계산 함수
const getMonthDates = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const firstWeekday = firstDayOfMonth.getDay()
    const totalDays = lastDayOfMonth.getDate()

    const days = Array(MAX_CALENDAR_DAYS).fill(null).map((_, index) => {
        const dayOffset = index - firstWeekday + 1
        return dayOffset > 0 && dayOffset <= totalDays 
            ? { value: dayOffset }
            : null
    })

    return days
}

// 주 단위로 날짜 배열 구성
const calendarDays = ref(getMonthDates())
const calendarWeeks = computed(() => {
    const weeks = []
    for (let i = 0; i < calendarDays.value.length; i += DAYS_IN_WEEK) {
        weeks.push(calendarDays.value.slice(i, i + DAYS_IN_WEEK))
    }
    return weeks
})
</script>

<style lang="css" scoped>
.calendar-container {
    width: 150px;
    margin: 0 auto;
}

.calendar-table {
    border-collapse: collapse;
    width: 100%;
}

.calendar-table th {
    padding: 4px;
    text-align: center;
}

.calendar-table td {
    padding: 4px;
    text-align: center;
}

.calendar-day-active {
    background-color: aqua;
}
</style>