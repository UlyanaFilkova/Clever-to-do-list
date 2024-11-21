<template>
  <div class="container">
    <HomeHeader />
    <CalendarList :todos="todos" />
    <ToDoList @toggle-todo="handleToggleTodo" :todos="todos" />
  </div>
</template>

<script>
import CalendarList from '@/components/CalendarList.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import ToDoList from '@/components/ToDoList.vue'
import { todoService } from '@/services/todo.js'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList,
  },
  data() {
    return {
      todos: [],
    }
  },
  async beforeCreate() {
    const userId = localStorage.getItem('userId')
    this.todos = await todoService.getTodos(userId)
  },
  methods: {
    async handleToggleTodo(todo) {
      await todoService.updateTodoStatus(localStorage.getItem('userId'), todo.id, todo.isDone)
      todo.isDone = !todo.isDone
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
