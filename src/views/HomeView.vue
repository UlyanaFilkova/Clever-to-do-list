<template>
  <div class="container">
    <button @click="logout" class="exit-button">Logout</button>
  </div>
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
.container {
  height: 100vh;
  padding-top: 30px;
}
.exit-button {
  padding: 5px;
  margin-left: 100px;
  background: #c1f7ce;
}
</style>
