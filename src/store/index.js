import { createStore } from 'vuex'
import todoService from '@/services/todo.js'

const store = createStore({
  state: {
    todos: [],
    activeDate: null,
    registrationDate: null,
    days: [],
    currentDayIndex: 0,
  },
  getters: {
    days(state) {
      return state.days
    },
    currentDayIndex(state) {
      return state.currentDayIndex
    },
    currentTodo() {
      const savedTodo = localStorage.getItem('currentTodo')
      return savedTodo ? JSON.parse(savedTodo) : null
    },
    activeDayInThePast(state) {
      if (!state.activeDate) return false
      const today = new Date()
      const activeDayDate = new Date(state.activeDate)

      today.setHours(0, 0, 0, 0)
      activeDayDate.setHours(0, 0, 0, 0)
      return activeDayDate < today
    },
  },
  mutations: {
    setDays(state, days) {
      state.days = days
    },
    setCurrentDayIndex(state, index) {
      state.currentDayIndex = index
    },
    updateDay(state, todo) {
      const todoDate = new Date(todo.date.seconds * 1000)

      const dayToUpdate = state.days.find(
        (day) => day.date.toDateString() === todoDate.toDateString(),
      )

      if (dayToUpdate) {
        if (!dayToUpdate.dayTaskState) {
          dayToUpdate.dayTaskState = ''
        }
      }
      if (todo.isDone) {
        dayToUpdate.dayTaskState += 'd'
      } else {
        dayToUpdate.dayTaskState += 'u'
      }
    },
    fetchDays(state) {
      const todosByDate = {}
      state.todos.forEach((todo) => {
        const todoDate = new Date(todo.date.seconds * 1000).toDateString() // convert to milliseconds

        if (!todosByDate[todoDate]) {
          todosByDate[todoDate] = { dayTaskState: '' }
        }

        if (todo.isDone) {
          todosByDate[todoDate].dayTaskState += 'd'
        } else {
          todosByDate[todoDate].dayTaskState += 'u'
        }
      })

      state.days.forEach((day) => {
        const dayDateString = day.date.toDateString()
        day.dayTaskState = todosByDate[dayDateString]?.dayTaskState || ''
      })
    },
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
      state.todos.find((todo) => todo.id === goalTodo.id).date = new Date(today)
    },
  },
  actions: {
    updateCurrentDayIndex({ commit }, index) {
      commit('setCurrentDayIndex', index)
    },
    fetchDays({ commit, state }) {
      const days = []
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const registDayWithoutTime = new Date(state.registrationDate)

      registDayWithoutTime.setHours(0, 0, 0, 0)

      // Generate days from registration date to current date
      for (let d = registDayWithoutTime; d < today; d.setDate(d.getDate() + 1)) {
        days.push({ date: new Date(d) })
      }

      // Generate days from current date to 30 days later
      for (let i = 0; i < 30; i++) {
        const nextDay = new Date(today)
        nextDay.setDate(today.getDate() + i)
        days.push({ date: nextDay })
      }

      // set currentDayIndex and activeDayIndex
      const currentDayIndex = days.findIndex(
        (day) => day.date.toDateString() === today.toDateString(),
      )
      commit('setCurrentDayIndex', currentDayIndex)

      if (!state.activeDate) {
        commit('setActiveDate', today)
      }
      commit('setDays', days)
      commit('fetchDays')
    },
    setDays({ commit }) {
      commit('setDays')
    },
    // updateDay({ commit }, todo) {
    //   commit('updateDay', todo)
    // },
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
      commit('updateDay', todo)
    },
    async removeTodo({ commit }, todoId) {
      commit('deleteTodo', todoId)
      await todoService.deleteTodo(todoId)
    },
    async addTodo({ commit }, todo) {
      commit('addTodo', todo)
      await todoService.addTodo(todo)
      commit('updateDay', todo)
    },
    async updateTodo({ commit, state }, newTodo) {
      commit('updateTodo', newTodo)
      await todoService.updateTodo(state.currentTodo.id, newTodo)
      commit('updateDay', newTodo)
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
      // commit('setActiveDate', today)
    },
  },
})

export default store
