<template>
  <div class="todo-list__container">
    <div class="todo-list__header">
      <h2>{{ filteredTodos.length }} Tasks</h2>
      <button class="todo-list__move-tasks" @click="moveTasksToToday()">Move tasks to today</button>
    </div>
    <ToDoItem
      v-for="(todo, index) in filteredTodos"
      :key="index"
      :todo="todo"
      @toggle-todo="toggleTodo(todo)"
      @delete-todo="deleteTodo(todo)"
      @click="openTodo(todo)"
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
    ...mapState(['todos', 'activeDate', 'registrationDate']),
    filteredTodos() {
      // console.log(this.todos)
      // console.log(this.activeDate)
      const targetDateString = this.activeDate?.toDateString()
      return this.todos.filter((todo) => {
        const todoDate = new Date(todo.date.seconds * 1000).toDateString()
        return todoDate === targetDateString
      })
    },
  },

  methods: {
    ...mapActions(['updateTodoStatus', 'removeTodo', 'setCurrentTodo', 'moveTasksToToday']),
    async toggleTodo(todo) {
      await this.updateTodoStatus(todo)
    },

    async deleteTodo(todo) {
      await this.removeTodo(todo.id)
    },
    async openTodo(todo) {
      await this.setCurrentTodo(todo)
      this.$router.push({ name: 'todo' })
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
.todo-list__header {
  display: flex;
  justify-content: space-between;
}
</style>
