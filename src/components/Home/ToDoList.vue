<template>
  <div class="todo-list__container">
    <div class="todo-list__header">
      <h2>{{ filteredTodos.length }} Tasks</h2>
      <SmallButton
        class="todo-list__move-tasks"
        @click="moveTasksToToday()"
        v-if="activeDayInThePast"
        text="Move tasks to today"
      >
      </SmallButton>
    </div>
    <ToDoItem
      v-for="(todo, index) in filteredTodos"
      :key="index"
      :todo="todo"
      @toggle-todo="toggleTodo(todo)"
      @delete-todo="handleDeleteTodo(todo)"
      @click.self="openTodo(todo)"
    />
  </div>
</template>
<script>
import ToDoItem from './ToDoItem.vue'
import SmallButton from '@/components/SmallButton.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ToDoItem,
    SmallButton,
  },

  computed: {
    ...mapState(['todos', 'activeDate', 'registrationDate']),
    ...mapGetters(['activeDayInThePast']),
    filteredTodos() {
      const targetDateString = this.activeDate?.toDateString()
      return this.todos.filter((todo) => {
        const todoDate = new Date(todo.date.seconds * 1000).toDateString()
        return todoDate === targetDateString
      })
    },
  },

  methods: {
    ...mapActions(['updateTodoStatus', 'deleteTodo', 'setCurrentTodo', 'moveTasksToToday']),
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
</style>
