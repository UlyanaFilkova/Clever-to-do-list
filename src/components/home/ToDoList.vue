<template>
  <div class="todo-list__container">
    <div class="todo-list__header">
      <h2>{{ filteredTodos.length }} Tasks</h2>
      <BaseButton
        v-if="activeDayInThePast"
        class="small-button"
        text="Move tasks to today"
        @click="moveTasksToToday()"
      />

    </div>
    <ToDoItem
      v-for="(todo, index) in filteredTodos"
      :key="index"
      :todo="todo"
      @toggle-todo="toggleTodo(todo)"
      @delete-todo="handleDeleteTodo(todo)"
      @open-todo="openTodo(todo)"
      @click.self="openTodo(todo)"
    />
  </div>
</template>
<script>
import ToDoItem from '@/components/home/ToDoItem.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ToDoItem,
    BaseButton,
  },

  computed: {
    ...mapGetters(['activeDayInThePast', 'todos', 'activeDate', 'registrationDate']),
    filteredTodos() {
      const targetDateString = this.activeDate?.toDateString()
      return this.todos.filter((todo) => {
        const todoDate = new Date(todo.date.seconds * 1000).toDateString()
        return todoDate === targetDateString
      })
    },
  },

  methods: {
    ...mapActions([
      'updateTodoStatus',
      'deleteTodo',
      'setCurrentTodo',
      'setLoading',
      'moveTasksToToday',
    ]),
    async toggleTodo(todo) {
      await this.updateTodoStatus(todo)
    },

    async handleDeleteTodo(todo) {
      await this.deleteTodo(todo)
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
  min-height: 33px;
}
@media (max-width: 576px) {
  h2 {
    font-size: 20px;
  }
  .todo-list__container {
    gap: 5px;
  }
}
</style>
