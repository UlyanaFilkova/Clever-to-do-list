<template>
  <div class="todo-list__container">
    <h2>{{ filteredTodos.length }} Tasks</h2>
    <ToDoItem
      v-for="(todo, index) in filteredTodos"
      :key="index"
      :todo="todo"
      @toggle-todo="toggleTodo(todo)"
      @delete-todo="deleteTodo(todo)"
    />
  </div>
</template>
<script>
import ToDoItem from './ToDoItem.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ToDoItem,
  },

  computed: {
    ...mapState(['todos', 'activeDayIndex', 'registrationDate']),
    filteredTodos() {
      const targetDate = new Date(this.registrationDate)
      targetDate.setDate(targetDate.getDate() + this.activeDayIndex)

      const targetDateString = targetDate.toDateString()

      return this.todos.filter((todo) => {
        const todoDate = new Date(todo.date.seconds * 1000).toDateString()
        return todoDate === targetDateString
      })
    },
  },
  methods: {
    ...mapActions(['updateTodoStatus', 'removeTodo']),
    async toggleTodo(todo) {
      await this.updateTodoStatus(todo)
    },

    async deleteTodo(todo) {
      await this.removeTodo(todo.id)
    },
  },
}
</script>

<style scoped>
.todo-list__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
