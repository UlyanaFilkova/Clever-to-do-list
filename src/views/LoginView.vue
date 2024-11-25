<template>
  <div class="login-container">
    <LoginForm />
    <div class="form-link">
      Don't have an account yet?
      <router-link to="registration" class="login__link">Create</router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm.vue'

export default {
  components: {
    LoginForm,
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

.form-link{
  margin: 0 auto;
  width:fit-content;
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
