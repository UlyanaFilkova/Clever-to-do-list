<template>
  <div class="container">
    <div v-if="isLoading" class="loader-overlay">
      <img src="@/assets/200w.webp" alt="Loading..." class="loader" />
    </div>
    <div>
      <HomeHeader />
      <CalendarList />
      <ToDoList />
      <BigButton v-if="!activeDayInThePast" @click="handleAddClick" text="+ Add a New Task" />
    </div>
  </div>
</template>

<script>
import CalendarList from '@/components/home/CalendarList.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'
import ToDoList from '@/components/home/ToDoList.vue'
import BigButton from '@/components/home/BigButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList,
    BigButton,
  },
  computed: {
    ...mapGetters(['todos', 'activeDate', 'registrationDate', 'isLoading', 'activeDayInThePast']),
  },
  methods: {
    ...mapActions(['fetchTodos', 'fetchRegistrationDate', 'fetchDays']),
    handleAddClick() {
      this.$router.push({ name: 'todo' })
    },
  },
  async mounted() {
    await this.fetchRegistrationDate()
    await this.fetchTodos()
    await this.fetchDays()

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

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loader {
  width: 100px;
  height: 100px;
}
</style>
