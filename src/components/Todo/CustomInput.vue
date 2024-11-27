<template>
  <div class="input-group">
    <label :for="name" v-if="type !== 'checkbox'">{{ placeholder }}:</label>
    <input
      v-if="type === 'text'"
      :name="name"
      type="text"
      :value="modelValue"
      @input="handleInput"
    />
    <textarea
      v-else-if="type === 'textarea'"
      :name="name"
      :value="modelValue"
      @input="handleInput"
    ></textarea>
    <div v-else-if="type === 'checkbox'" class="checkbox-container">
      <input
        id="checkbox-id"
        type="checkbox"
        :name="name"
        :checked="modelValue"
        @change="handleCheckboxChange"
      />
      <label for="checkbox-id">is done</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      default: '',
    },
    placeholder: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
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
.input-group label {
  display: block;
  color: #833700;
  margin-bottom: 5px;
}
.input-group input[type='text'],
.input-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d7b7a0;
  border-radius: 8px;
  display: block;
  margin-bottom: 20px;
  outline: none;
}
.input-group input[type='text']:focus,
.input-group textarea:focus {
  outline: 1.5px solid #d7b7a0;
}
.checkbox-container {
  display: flex;
  align-items: end;
  gap: 6px;
}
.checkbox-container label {
  cursor: pointer;
  margin: 0;
}
input[type='checkbox'] {
  margin: 5px 0 0 0;
  height: 20px;
  width: 20px;
  border: 1px solid #d7b7a0;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
}
</style>
