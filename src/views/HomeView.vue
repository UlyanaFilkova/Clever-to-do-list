<template>
  <div class="container">
    <HomeHeader />
    <CalendarList/>
  </div>
</template>

<script>
import CalendarList from '@/components/CalendarList.vue';
import HomeHeader from '@/components/HomeHeader.vue'

export default {
  components: {
    HomeHeader,
    CalendarList
  },
  
}
</script>

<style scoped>
.container {
  height: 100vh;
  padding-top: 30px;
}

</style>
