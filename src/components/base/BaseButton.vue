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
  background: var(--color-second);
}
.small-button:hover {
  background: var(--color-second-hover);
}
.small-button.grey {
  background: var(--color-third);
}
.small-button.grey:hover {
  background: var(--color-third-hover);
}
.big-button {
  width: 176px;
  padding: 14px 24px;
  background-color: var(--color-main);
  color: var(--color-text-main);
  border-radius: 8px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
}
.big-button:hover {
  background-color: var(--color-main-hover);
}
.big-button:disabled {
  background-color: var(--color-main-disabled);
  cursor: auto;
}
.medium-button{
  width: 100%;
  padding: 10px;
  background-color: var(--color-main);
  color: var(--color-text-main);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.medium-button:hover {
  background-color: var(--color-main-hover);
}

.medium-button:disabled {
  background-color: var(--color-main-disabled);
  cursor: auto;
}
</style>
