<template>
  <div class="container">
    <HomeHeader />
    <CalendarList
      :todos="todos"
      :activeDayIndex="activeDayIndex"
      @changeActiveDay="(index) => (activeDayIndex = index)"
    />
    <ToDoList :todos="todos" :activeDayIndex="activeDayIndex" @toggle-todo="handleToggleTodo" />
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
    }
  },
  async beforeCreate() {
    const userId = localStorage.getItem('userId')
    this.todos = await todoService.getTodos(userId)
    // console.log(this.activeDate)
  },
  methods: {
    async handleToggleTodo(todo) {
      todo.isDone = !todo.isDone
      await todoService.updateTodoStatus(localStorage.getItem('userId'), todo.id, todo.isDone)
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
