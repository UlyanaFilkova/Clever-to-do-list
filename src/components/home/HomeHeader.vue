<template>
  <header class="header">
    <h2>To-do List</h2>
    <SmallButton @click="logout" text="Logout"></SmallButton>
  </header>
</template>

<script>
import SmallButton from '@/components/SmallButton.vue'
export default {
  components: {
    SmallButton,
  },
  methods: {
    logout() {
      localStorage.removeItem('userId')
      this.$router.push({ name: 'login' })
      this.$store.dispatch('resetStore')
    },
  },
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 20px 0;
  padding-top: 0px;
}
@media(max-width: 576px){
  h2{
    font-size: 20px;
  }
}
</style>
