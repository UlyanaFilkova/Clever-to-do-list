<template>
  <div class="input-group">
    <input :type="type" :value="modelValue" @input="handleInput" :placeholder="placeholder" />
    <div class="invalid-input" :style="{ visibility: showErrors ? 'visible' : 'hidden' }">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    showErrors: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<style scoped>
.input-group {
  margin-bottom: 15px;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.invalid-input {
  min-height: 18px;
  color: red;
}
</style>
