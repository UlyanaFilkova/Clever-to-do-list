<template>
  <div class="container">
    <HomeHeader />
    <Calendar/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue';
import HomeHeader from '@/components/HomeHeader.vue'

export default {
  components: {
    HomeHeader,
    Calendar
  },
  
}
</script>

<style scoped>
.container {
  height: 100vh;
  padding-top: 30px;
}

</style>
