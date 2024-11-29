<template>
  <div class="container">
    <div v-if="isLoading" class="loader-overlay">
      <img src="@/assets/200w.webp" alt="Loading..." class="loader" />
    </div>
    <div>
      <HomeHeader />
      <CalendarList />
      <ToDoList />
      <BaseButton
        v-if="!activeDayInThePast"
        @click="handleAddClick"
        text="+ Add a New Task"
        class="big-button fixed-button"
      />
    </div>
  </div>
</template>

<script>
import CalendarList from '@/components/home/CalendarList.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'
import ToDoList from '@/components/home/ToDoList.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList,
    BaseButton,
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

  mounted() {
    this.fetchRegistrationDate()
      .then(() => this.fetchTodos())
      .then(() => this.fetchDays())
      .then(() => window.scrollTo({ top: 0 }))
  },
}
</script>

<style scoped>
.container {
  box-sizing: border-box;
  min-height: 100vh;
  margin: 0 20px;
  padding-bottom: 70px;
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

.fixed-button {
  display: block;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
