<template>
  <div class="login-container">
    <RegistrationForm />
    <div class="form-link">
      Already have an account?
      <router-link to="login" class="login__link">Login</router-link>
    </div>
  </div>
</template>

<script>
import RegistrationForm from '@/components/Auth/RegistrationForm.vue'

export default {
  components: {
    RegistrationForm,
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
.form-link {
  margin: 0 auto;
  width: fit-content;
}
.login__link {
  color: #0056b3;
  text-decoration: underline;
}
.login__link:hover {
  cursor: pointer;
  text-decoration: none;
}
</style>
