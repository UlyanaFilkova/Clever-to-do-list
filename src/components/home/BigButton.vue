<template>
  <button class="big-button" > {{ text }} </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}</script>

<style scoped>
.big-button {
  width: 176px;
  display: block;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 24px;
  background-color: #fb6914;
  color: #fff;
  border-radius: 8px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
}
.big-button:hover {
  background-color: #d74f00;
}
</style>
