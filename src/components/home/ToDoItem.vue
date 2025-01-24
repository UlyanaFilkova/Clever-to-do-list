<template>
  <div class="todo__container" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="todo__main-part">
      <CustomCheckbox :checked="todo.isDone" @click.stop="$emit('toggle-todo', todo)" />
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
import CustomCheckbox from '@/components/base/CustomCheckbox.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  components: {
    ConfirmModal,
    DeleteIcon,
    CustomCheckbox,
  },
  data() {
    return {
      showModal: false,
      isHovered: false,
    }
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
  background-color: var(--color-sixth-hover);
}
.todo__main-part {
  display: flex;
  gap: 15px;
  align-items: center;
}

.todo__title {
  cursor: pointer;
}
</style>
