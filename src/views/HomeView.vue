<template>
  <keep-alive>
    <div class="container">
      <HomeHeader />
      <CalendarList />
      <ToDoList />
      <BigButton v-if="activeDayInThePast" />
    </div>
  </keep-alive>
</template>

<script>
import CalendarList from '@/components/Home/CalendarList.vue'
import HomeHeader from '@/components/Home/HomeHeader.vue'
import ToDoList from '@/components/Home/ToDoList.vue'
import BigButton from '@/components/Home/BigButton.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList,
    BigButton,
  },
  async created() {
    await this.fetchRegistrationDate()
    await this.fetchTodos()
  },
  computed: {
    ...mapState(['todos', 'activeDate', 'registrationDate']),

    // determined if add-new-task button should be shown
    activeDayInThePast() {
      if (!this.activeDate) return false
      const today = new Date()
      const activeDayDate = new Date(this.activeDate)

      today.setHours(0, 0, 0, 0)
      activeDayDate.setHours(0, 0, 0, 0)
      return activeDayDate >= today
    },
  },

  methods: {
    ...mapActions(['fetchTodos', 'fetchRegistrationDate']),
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
