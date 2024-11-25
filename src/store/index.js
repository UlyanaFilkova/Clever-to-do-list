import { createStore } from 'vuex'
import todoService from '@/services/todo.js'

const store = createStore({
  state: {
    todos: [],
    // activeDayIndex: 0,
    activeDate: null,
    registrationDate: null,
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos
    },
    setActiveDate(state, date) {
      state.activeDate = date
    },
    setRegistrationDate(state, date) {
      state.registrationDate = date
    },
    toggleTodoStatus(state, todoId) {
      const todo = state.todos.find((t) => t.id === todoId)
      if (todo) {
        todo.isDone = !todo.isDone
      }
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter((t) => t.id !== todoId)
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      const todos = await todoService.getTodos()
      commit('setTodos', todos)
    },
    async fetchRegistrationDate({ commit }) {
      const date = await todoService.getRegistrationDate()
      commit('setRegistrationDate', date)
    },
    async updateTodoStatus({ commit }, todo) {
      commit('toggleTodoStatus', todo.id)
      await todoService.updateTodoStatus(todo.id, todo.isDone)
    },
    async removeTodo({ commit }, todoId) {
      commit('deleteTodo', todoId)
      await todoService.deleteTodo(todoId)
    },
    async addTodo({ commit }, todo) {
      commit('addTodo', todo)
      await todoService.addTodo(todo)
    },
    // setActiveDayIndex({ commit }, index) {
    //   commit('setActiveDayIndex', index)
    // },
    setActiveDate({ commit }, date) {
      commit('setActiveDate', date)
    },
  },
})

export default store
