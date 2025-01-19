<template>
    <div class ="container">
        <h3>{{ user_name }}</h3>
    </div>
</template>
<script>
    export default{
        setup(){

        },
        props : {
            user_name : String,
        }
    }
</script>

<style scoped>
  .container{
    text-align: center;
  }
</style>
