<template>
  <div class="todo-list__container">
    <h2>{{ todos.length }} Tasks Today</h2>
    <ToDoItem
      v-for="(todo, index) in todos"
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
