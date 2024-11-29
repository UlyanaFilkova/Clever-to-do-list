<template>
  <div class="todo__container" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="todo__main-part">
      <div
        class="todo__indicator"
        :class="{ todo__indicator_done: todo.isDone }"
        @click.stop="$emit('toggle-todo', todo)"
      >
        <DoneIcon v-if="todo.isDone" />
      </div>
      <div class="todo__title" @click.stop="$emit('open-todo', todo)">{{ todo.title }}</div>
    </div>
    <DeleteIcon v-if="isHovered" @click.stop="this.showModal = true" />
    <ConfirmModal
      :isVisible="showModal"
      @cancel="this.showModal = false"
      @confirm="handleDeleteConfirmation"
    />
  </div>
</template>

<script>
import ConfirmModal from '@/components/base/ConfirmModal.vue'
import DoneIcon from '@/components/icons/DoneIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

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
      isHovered: false,
    }
  },
  components: {
    ConfirmModal,
    DoneIcon,
    DeleteIcon,
  },
  methods: {
    handleDeleteConfirmation() {
      this.showModal = false
      this.$emit('delete-todo', this.todo)
    },
  },
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
.todo__title {
  cursor: pointer;
}
</style>
