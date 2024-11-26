<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal">
      <h2>Confirm deletion</h2>
      <p>Are you sure you want to delete this task?</p>
      <SmallButton @click="this.$emit('confirm')" text="Delete"></SmallButton>
      <button @click="this.$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>

<script>
import SmallButton from '@/components/SmallButton.vue'

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    SmallButton,
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
  background: #fff;
  padding: 30px 20px 20px 20px;
  border-radius: 5px;
  text-align: center;
}

h2 {
  font-size: 22px;
  margin-bottom: 20px;
}

p {
  color: #373737;
  margin-bottom: 20px;
}

button {
  margin: 10px;
}

button {
  padding: 7px 10px;
  border-radius: 5px;
  background: #bababa;
}
button:hover {
  background: #9c9c9c;
}
</style>
