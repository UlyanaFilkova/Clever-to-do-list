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
    />
  </div>
</template>

<script>
import CalendarList from '@/components/CalendarList.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import ToDoList from '@/components/ToDoList.vue'
import todoService from '@/services/todo.js'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList,
  },
  data() {
    return {
      todos: [],
      activeDayIndex: 0,
      registrationDate: null,
    }
  },
  async beforeCreate() {
    this.registrationDate = await todoService.getRegistrationDate()
    this.todos = await todoService.getTodos()

    // Устанавливаем activeDayIndex как разницу между текущим днем и днем регистрации
    const today = new Date()
    const registrationDate = new Date(this.registrationDate)
    const differenceInTime = today.getTime() - registrationDate.getTime()
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)) // Конвертируем миллисекунды в дни

    // Убедитесь, что разница не меньше 0
    this.activeDayIndex = Math.max(differenceInDays, 0)
  },
  methods: {
    async handleToggleTodo(todo) {
      todo.isDone = !todo.isDone
      await todoService.updateTodoStatus(todo.id, todo.isDone)
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
