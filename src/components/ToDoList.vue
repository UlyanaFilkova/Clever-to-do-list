<template>
  <div class="todo-list__container">
    <h2>{{ filteredTodos.length }} Tasks Today</h2>
    <ToDoItem
      v-for="(todo, index) in filteredTodos"
      :key="index"
      :todo="todo"
      @toggle-todo="$emit('toggle-todo', todo)"
    />
  </div>
</template>
<script>
import ToDoItem from '@/components/ToDoItem.vue'

export default {
  components: {
    ToDoItem,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
    activeDayIndex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    filteredTodos() {
      console.log(this.activeDayIndex)
      const today = new Date()
      const targetDate = new Date(today)
      targetDate.setDate(today.getDate() + this.activeDayIndex)
      const targetDateString = targetDate.toDateString()

      return this.todos.filter((todo) => {
        const todoDate = new Date(todo.date.seconds * 1000).toDateString()
        return todoDate === targetDateString
      })
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
