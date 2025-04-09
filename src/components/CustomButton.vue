<template>
    <button class="custom-button"><slot></slot></button>
</template>

<script setup>
</script>

<style lang="css" scoped>
    .custom-button{
        min-width: 50px;
        max-width: 150px;
        width: 100%;
        outline: none;
        border:none;
        padding : 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    .custom-button:hover{
        background-color: rgb(230, 230, 230);
    }
</style>