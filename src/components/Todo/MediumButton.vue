<template>
  <button class="medium-button" :disabled="disabled">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.medium-button {
  width: 176px;
  display: block;
  margin: 30px auto 0 auto;
  padding: 14px 24px;
  background-color: #fb6914;
  color: #fff;
  border-radius: 8px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
}
.medium-button:hover {
  background-color: #d74f00;
}
.medium-button:disabled {
  background-color: #808080;
  cursor: auto;
}
</style>
