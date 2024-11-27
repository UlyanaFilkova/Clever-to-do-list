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
    ...mapState(['todos', 'activeDate', 'registrationDate', 'isLoading']),
    ...mapGetters(['activeDayInThePast']),
  },
  methods: {
    ...mapActions(['fetchTodos', 'fetchRegistrationDate']),
    handleAddClick() {
      this.$router.push({ name: 'todo' })
    },
  },
  async created() {
    await this.fetchRegistrationDate()
    await this.fetchTodos()
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
  position: fixed; /* Фиксируем на весь экран */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Убедитесь, что overlay выше других элементов */
}

.loader {
  width: 100px;
  height: 100px;
}

</style>
