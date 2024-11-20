<template>
  <div class="container">
    <HomeHeader />
    <CalendarList />
  </div>
</template>

<script>
import CalendarList from '@/components/CalendarList.vue'
import HomeHeader from '@/components/HomeHeader.vue'

export default {
  components: {
    HomeHeader,
    CalendarList,
  },
}
</script>

<style scoped>
.container {
  height: 100vh;
  margin: 0 20px;
}
@media (max-width: 576px) {
  .container {
    margin: 0 15px;
  }
}
</style>
