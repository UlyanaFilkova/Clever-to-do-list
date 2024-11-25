<template>
  <div class="container">
    <TodoHeader />
    <TodoForm />
  </div>
</template>
<script>
import TodoHeader from '@/components/Todo/TodoHeader.vue'
import TodoForm from '@/components/Todo/TodoForm.vue'

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
}
</style>
