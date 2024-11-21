<template>
  <div class="todo-list__container">
    <h2>{{ todos.length }} Tasks Today</h2>
    <ToDoItem
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      @toggle-todo="toggleTodoStatus"
    />
  </div>
</template>
<script>
import ToDoItem from '@/components/ToDoItem.vue'
import { todoService } from '@/services/todo.js'

export default {
  components: {
    ToDoItem,
  },
  data() {
    return {
      todos: [],
    }
  },
  async mounted() {
    const userId = localStorage.getItem('userId')
    this.todos = await todoService.getTodos(userId)
  },
  methods: {
    async toggleTodoStatus(todo) {
      await todoService.updateTodoStatus(localStorage.getItem('userId'), todo.id, todo.isDone)
      todo.isDone = !todo.isDone
    },
  },
}
</script>

<style scoped>
.todo-list__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
