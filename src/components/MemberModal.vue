<template>
    <Teleport to="body">
        <div class="modal">
            <h1>Test</h1>
            <input type ="text">   
        </div>
    </Teleport>
</template>
<script setup>
</script>
<style lang="css" scoped>
.modal {
  position: fixed;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap : 10px;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 400px;
  margin-left : -200px;
  padding : 20px;
  box-sizing: border-box;
  background-color: rgb(249, 249, 249)
}
.modal button{
    width : 100%;
}
.modal-div{
    display: flex;
}
.modal-div ul{
    list-style-type: none;
    height:100%;
}

.modal-div li{
    padding : 10px;
    min-height: 100px;
    max-height: 100px;
    border : 1px solid black;
    border-collapse: collapse;
}
</style>