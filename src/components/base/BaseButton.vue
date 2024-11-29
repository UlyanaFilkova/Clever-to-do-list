<template>
  <button>{{ text }}</button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
.small-button {
  padding: 7px 10px;
  border-radius: 5px;
  background: #ffae80;
}
.small-button:hover {
  background: #ff8a47;
}
.big-button {
  width: 176px;
  padding: 14px 24px;
  background-color: #fb6914;
  color: #fff;
  border-radius: 8px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
}
.big-button:hover {
  background-color: #d74f00;
}
.big-button:disabled {
  background-color: #808080;
  cursor: auto;
}
</style>
