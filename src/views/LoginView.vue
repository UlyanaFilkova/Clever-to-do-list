<template>
  <div class="login-container">
    <LoginForm />
    <div>
      Don't have an account yet?
      <RouterLink to="registration" class="login__link">Create</RouterLink>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import { RouterLink } from 'vue-router';

export default {
  components: {
    LoginForm,
    RouterLink,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
