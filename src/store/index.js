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
    moveTasksToToday(state, { goalTodo, today }) {
      // const index = state.todos.findIndex((t) => t.id === goalTodo.id)
      // console.log(state.todos[index])
      // if (index !== -1) {
      //   // Создаем новый объект задачи с обновленной датой
      //   const updatedTodo = {
      //     ...state.todos[index],
      //     date: today,
      //   }
      //   console.log(updatedTodo)
      //   // Заменяем старую задачу на новую
      //   state.todos.splice(index, 1, updatedTodo)
      // }
      state.todos.find((todo) => todo.id === goalTodo.id).date = new Date(today)
      // if (todo) {
      //   todo.date = today
      // }
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
    async moveTasksToToday({ commit, state }) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      await Promise.all(
        state.todos.map(async (todo) => {
          if (
            new Date(todo.date.seconds * 1000).toDateString() === state.activeDate.toDateString()
          ) {
            commit('moveTasksToToday', { goalTodo: todo, today })
            try {
              await todoService.updateTodo(todo.id, { ...todo, date: today })
            } catch (error) {
              console.error(`Error updating task with ID ${todo.id}:`, error)
            }
          }
        }),
      )
      commit('setActiveDate', today)
    },
  },
})

export default store
