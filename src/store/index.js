import { createStore } from 'vuex'
import todoService from '@/services/todo.js'

const getInitialState = () => {
  const savedTodo = localStorage.getItem('currentTodo')
  return savedTodo ? JSON.parse(savedTodo) : null
}

const store = createStore({
  state: {
    todos: [],
    activeDate: null,
    registrationDate: null,
    currentTodo: getInitialState(),
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
    updateTodo(state, newTodo) {
      const oldTodo = state.todos.find((t) => t.id === newTodo.id)
      if (oldTodo) {
        Object.assign(oldTodo, newTodo)
      }
    },
    setCurrentTodo(state, todo) {
      state.currentTodo = todo
      localStorage.setItem('currentTodo', JSON.stringify(todo))
    },
    clearCurrentTodo(state) {
      state.currentTodo = null
      localStorage.removeItem('currentTodo')
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
    async updateTodo({ commit, state }, newTodo) {
      commit('updateTodo', newTodo)
      await todoService.updateTodo(state.currentTodo.id, newTodo)
    },
    setActiveDate({ commit }, date) {
      commit('setActiveDate', date)
    },
    setCurrentTodo({ commit }, todo) {
      commit('setCurrentTodo', todo)
    },
    clearCurrentTodo({ commit }) {
      commit('clearCurrentTodo')
    },
  },
})

export default store
