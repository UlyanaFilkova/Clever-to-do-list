<template>
  <div class="todo__container">
    <div
      class="todo__indicator"
      :class="{ todo__indicator_done: todo.isDone || isHovered }"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
      @click="toggleTodoStatus"
    >
      <svg
        v-if="todo.isDone || isHovered"
        class="todo__indicator-svg"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 48 48"
      >
        <path d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"></path>
      </svg>
    </div>
    <div class="todo__title">{{ todo.title }}</div>
  </div>
</template>

<script>
import { todoService } from '@/services/todo.js'
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
    }
  },
  methods: {
    async toggleTodoStatus() {
     
      await todoService.updateTodoStatus(
        localStorage.getItem('userId'),
        this.todo.id,
        this.todo.isDone,
      )
    },
  },
}
</script>

<style scoped>
.todo__container {
  display: flex;
  gap: 15px;
  align-items: center;
}
.todo__indicator {
  width: 24px;
  height: 24px;
  border: 1.5px solid #fb6914;
  border-radius: 12px;
  cursor: pointer;
}
.todo__indicator_done {
  background-color: #fb6914;
}
.todo__indicator-svg {
  margin: 3px 0 0 3px;
  width: 16px;
  height: 16px;
  fill: #fff;
}
.todo__title {
  cursor: pointer;
}
.todo__title:hover {
  text-decoration: underline;
}
</style>
