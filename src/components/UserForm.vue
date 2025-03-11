<template>
    <form class ="user-form">
        <input type="text">
        <input type="text">
        <select>
            <option>일반</option>
            <option>학생</option>
            <option>타지</option>
        </select>
        <button type ="submit"></button>
    </form>
</template>

<script setup>
</script>

<style lang="css" scoped>
.user-form{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:20px;
}

.user-form > *{
    width:100%;
    padding : 10px;
}
</style>