<template>
  <div class="todo__container">
    <div class="todo__main-part">
      <div
        class="todo__indicator"
        :class="{ todo__indicator_done: todo.isDone }"
        @click.stop="$emit('toggle-todo', todo)"
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
    <button class="todo__delete" @click.stop="this.showModal = true">
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 490 490"
        xml:space="preserve"
        stroke-width="25"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

        <g id="SVGRepo_iconCarrier">
          <polygon
            points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "
          />
        </g>
      </svg>
    </button>
    <ModalConfirmWindow
      :isVisible="showModal"
      @cancel="showModal = false"
      @confirm="$emit('delete-todo', todo)"
    />
  </div>
</template>

<script>
import ModalConfirmWindow from '@/components/ModalConfirmWindow.vue'
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  components: {
    ModalConfirmWindow,
  },
  methods: {},
}
</script>

<style scoped>
.todo__container {
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px 12px 15px;
  cursor: pointer;
  border-radius: 5px;
}
.todo__container:hover {
  background-color: #ffebdf;
}
.todo__main-part {
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
.todo__delete {
  width: 16px;
  height: 16px;
}
.todo__delete svg {
  display: none;
  width: 16px;
  height: 16px;
  fill: #fe2d2d;
  stroke: #fe2d2d;
}
.todo__delete:hover svg {
  fill: #d80000;
  stroke: #d80000;
}
.todo__container:hover .todo__delete svg {
  display: block;
}
</style>
