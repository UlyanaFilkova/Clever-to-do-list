<template>
  <div class="todo__container">
    <div
      class="todo__indicator"
      :class="{ todo__indicator_done: todo.isDone }"
      @click="$emit('toggle-todo', todo)"
    >
      <svg
        v-if="todo.isDone"
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
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.todo__container {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 12px 10px 12px 15px;
  cursor: pointer;
  border-radius: 5px;
}
.todo__container:hover {
  background-color: #ffebdf;
}
.todo__indicator {
  width: 24px;
  height: 24px;
  border: 1.5px solid #fb6914;
  border-radius: 12px;
  cursor: pointer;
  background-color: #fff;
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
</style>
