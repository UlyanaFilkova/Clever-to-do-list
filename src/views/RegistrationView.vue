<template>
  <div class="login-container">
    <RegistrationForm />
    <RouterLink to="login" class="login__link">Log in</RouterLink>
  </div>
</template>

<script>
import RegistrationForm from '@/components/RegistrationForm.vue'
import { RouterLink } from 'vue-router';

export default {
  components: {
    RegistrationForm,
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
