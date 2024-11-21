<template>
  <div class="container">
    <HomeHeader />
    <CalendarList />
    <ToDoList />
  </div>
</template>

<script>
import CalendarList from '@/components/CalendarList.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import ToDoList from '@/components/ToDoList.vue'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList
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
