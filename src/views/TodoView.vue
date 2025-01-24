<template>
  <div class="container">
    <TodoHeader />
    <TodoForm />
  </div>
</template>
<script>
import TodoHeader from '@/components/todo/TodoHeader.vue'
import TodoForm from '@/components/todo/TodoForm.vue'

export default {
  components: {
    TodoHeader,
    TodoForm,
  },
}
</script>
<style scoped>
.container {
  height: 100vh;
  margin: 0 20px;
}
</style>
