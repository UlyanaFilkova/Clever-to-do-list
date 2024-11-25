<template>
  <keep-alive>
    <div class="container">
      <HomeHeader />
      <CalendarList />
      <ToDoList />
      <BigButton v-if="activeDayInThePast" />
    </div>
  </keep-alive>
</template>

<script>
import CalendarList from '@/components/CalendarList.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import ToDoList from '@/components/ToDoList.vue'
import BigButton from '@/components/BigButton.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    HomeHeader,
    CalendarList,
    ToDoList,
    BigButton,
  },
  // data() {
  //   return {
  //     todos: [],
  //     activeDayIndex: 0,
  //     registrationDate: null,
  //   }
  // },
  // async beforeCreate() {
  //   this.registrationDate = await todoService.getRegistrationDate()
  //   this.todos = await todoService.getTodos()
  // },
  async created() {
    await this.fetchRegistrationDate()
    await this.fetchTodos()
  },
  computed: {
    ...mapState(['todos', 'activeDayIndex', 'registrationDate']),

    // determined if add-new-task button should be shown
    activeDayInThePast() {
      if (!this.registrationDate) return false

      const registrationDate = new Date(this.registrationDate)
      const activeDayDate = new Date(registrationDate)
      activeDayDate.setDate(activeDayDate.getDate() + this.activeDayIndex)

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      activeDayDate.setHours(0, 0, 0, 0)

      return activeDayDate >= today
    },
  },

  methods: {
    ...mapActions([
      'fetchTodos',
      'fetchRegistrationDate',
      // 'updateTodoStatus',
      // 'removeTodo',
      // 'setActiveDayIndex',
    ]),
    // changeActiveDay(index) {
    //   this.setActiveDayIndex(index)
    // },
    // async handleToggleTodo(todo) {

    //   await this.updateTodoStatus(todo)
    //   // todo.isDone = !todo.isDone
    //   // await todoService.updateTodoStatus(todo.id, todo.isDone)
    // },
    // async handleDeleteTodo(todo) {
    //   // this.todos = this.todos.filter((t) => t.id !== todo.id)
    //   // await todoService.deleteTodo(todo.id)
    //   await this.removeTodo(todo.id)
    // },
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
