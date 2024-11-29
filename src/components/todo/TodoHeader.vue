<template>
  <div class="todo-header__container">
    <router-link to="home" class="back-button" @click="clearCurrentTodo()">
      <BackIcon />
      Back
    </router-link>
    <BaseButton
      v-if="currentTodo"
      @click="showModal = true"
      text="Delete"
      class="small-button"
    ></BaseButton>
    <ConfirmModal :isVisible="showModal" @confirm="handleDeleteTodo" @cancel="showModal = false" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/base/BaseButton.vue'
import ConfirmModal from '@/components/base/ConfirmModal.vue'
import BackIcon from '@/components/icons/BackIcon.vue'
export default {
  components: {
    BaseButton,
    ConfirmModal,
    BackIcon,
  },
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapGetters(['currentTodo']),
  },
  methods: {
    ...mapActions(['deleteTodo', 'clearCurrentTodo']),
    async handleDeleteTodo() {
      await this.deleteTodo(this.currentTodo)
      this.clearCurrentTodo()
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped>
.todo-header__container {
  margin: 30px 0 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.back-button {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  color: var(--color-twelve);
}

.back-button__icon svg {
  height: 24px;
  width: 24px;
  fill: var(--color-twelve);
}
.back-button:hover {
  color: var(--color-card-third);
  cursor: pointer;
}
.back-button:hover svg {
  fill: var(--color-card-third);
}
</style>
