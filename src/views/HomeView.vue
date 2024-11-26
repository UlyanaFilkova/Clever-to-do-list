<template>
  <div class="container">
    <HomeHeader />
    <CalendarList />
    <ToDoList />
    <BigButton v-if="!activeDayInThePast" @click="handleAddClick" text="+ Add a New Task" />
  </div>
</template>

<script>
import CalendarList from '@/components/Home/CalendarList.vue'
import HomeHeader from '@/components/Home/HomeHeader.vue'
import ToDoList from '@/components/Home/ToDoList.vue'
import BigButton from '@/components/Home/BigButton.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList,
    BigButton,
  },
  computed: {
    ...mapState(['todos', 'activeDate', 'registrationDate']),
    ...mapGetters(['activeDayInThePast']),
  },
  methods: {
    ...mapActions(['fetchTodos', 'fetchRegistrationDate']),
    handleAddClick() {
      this.$router.push({ name: 'todo' })
    },
  },
  created() {
    this.fetchRegistrationDate()
    this.fetchTodos()
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
