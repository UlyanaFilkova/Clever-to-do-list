<template>
  <div class="container">
    <HomeHeader />
    <CalendarList
      :todos="todos"
      :activeDayIndex="activeDayIndex"
      :registrationDate="registrationDate"
      @changeActiveDay="(index) => (activeDayIndex = index)"
    />
    <ToDoList
      :todos="todos"
      :activeDayIndex="activeDayIndex"
      :registrationDate="registrationDate"
      @toggle-todo="handleToggleTodo"
      @delete-todo="handleDeleteTodo"
    />
    <BigButton v-if="activeDayInThePast" />
  </div>
</template>

<script>
import CalendarList from '@/components/CalendarList.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import ToDoList from '@/components/ToDoList.vue'
import BigButton from '@/components/BigButton.vue'
import todoService from '@/services/todo.js'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList,
    BigButton,
  },
  data() {
    return {
      todos: [],
      activeDayIndex: 0,
      registrationDate: null,
    }
  },
  computed: {
    activeDayInThePast() {
      if (!this.registrationDate) return false

      const registrationDate = new Date(this.registrationDate)
      const activeDayDate = new Date(registrationDate)
      activeDayDate.setDate(activeDayDate.getDate() + this.activeDayIndex)

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      activeDayDate.setHours(0, 0, 0, 0)

      return activeDayDate >= today
    },
  },
  async beforeCreate() {
    this.registrationDate = await todoService.getRegistrationDate()
    this.todos = await todoService.getTodos()

    // set activeDayIndex to the difference between the current day and the registration day
    const today = new Date()
    const registrationDate = new Date(this.registrationDate)
    const differenceInTime = today.getTime() - registrationDate.getTime()
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)) // convert milliseconds into days

    this.activeDayIndex = Math.max(differenceInDays, 0)
  },
  methods: {
    async handleToggleTodo(todo) {
      todo.isDone = !todo.isDone
      await todoService.updateTodoStatus(todo.id, todo.isDone)
    },
    async handleDeleteTodo(todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id)

      await todoService.deleteTodo(todo.id)
    },
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
