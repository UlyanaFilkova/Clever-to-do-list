import { createStore } from 'vuex';
import todoService from '@/services/todo.js';

const store = createStore({
  state: {
    todos: [],
    activeDayIndex: 0,
    registrationDate: null,
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setActiveDayIndex(state, index) {
      state.activeDayIndex = index;
    },
    setRegistrationDate(state, date) {
      state.registrationDate = date;
    },
    toggleTodoStatus(state, todoId) {
      const todo = state.todos.find(t => t.id === todoId);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(t => t.id !== todoId);
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      const todos = await todoService.getTodos();
      commit('setTodos', todos);
    },
    async fetchRegistrationDate({ commit }) {
      const date = await todoService.getRegistrationDate();
      commit('setRegistrationDate', date);
    },
    async updateTodoStatus({ commit }, todoId) {
      commit('toggleTodoStatus', todoId);
      // Здесь вы можете вызвать сервис для обновления статуса в базе данных
      await todoService.updateTodoStatus(todoId, !todo.isDone);
    },
    async removeTodo({ commit }, todoId) {
      commit('deleteTodo', todoId);
      await todoService.deleteTodo(todoId);
    },
  },
});

export default store;