<template>
  <button class="small-button">{{text}}</button>
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
</style>