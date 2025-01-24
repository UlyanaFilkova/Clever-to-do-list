<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal">
      <h2>Confirm deletion</h2>
      <p>Are you sure you want to delete this task?</p>
      <BaseButton text="Delete" class="small-button margin-right" @click="this.$emit('confirm')" />
      <BaseButton text="Cancel" class="small-button grey" @click="this.$emit('cancel')" />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    BaseButton,
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: var(--color-text-main);
  padding: 30px 20px 20px 20px;
  border-radius: 5px;
  text-align: center;
}

h2 {
  font-size: 22px;
  margin-bottom: 20px;
}

p {
  color: var(--color-text-second);
  margin-bottom: 20px;
}

.margin-right{
  margin-right: 20px;
}
</style>
