<template>
  <header class="header">
      <h2>To-do List</h2>
      <button @click="logout" class="exit-button">Logout</button>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('userId')
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px 20px 0;
}

@media(max-width: 576px){
    .header{
        margin: 0 10px;
    }
}

.exit-button {
  padding: 7px 10px;
  border-radius: 5px;
  background: #c1f7ce;
}
</style>
