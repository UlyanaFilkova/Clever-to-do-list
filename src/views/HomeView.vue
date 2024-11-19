<template>
  <div class="container">
    Hello, it's your todos list!
  
    <RouterLink to="login" class="exit-button">Logout</RouterLink>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
}
.exit-button{
  padding: 5px;
  margin-left: 100px;
  background: #c1f7ce;
}
</style>
