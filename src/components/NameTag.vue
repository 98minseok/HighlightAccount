<template>
    <div class ="container">
        <h1 :value ="name"></h1>
    </div>
</template>
<script>
    export default{
        setup(){
            const name = props.name;
            return {
                name,
            }
        },
        props : {
            name : String,
        }
    }
</script>