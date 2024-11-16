<template>
  <form @submit.prevent="handleSubmit">
    <h1>Create an account</h1>
    <FormInput
      v-model="username"
      type="text"
      placeholder="Username"
      autocomplete="username"
      required
      :showErrors="showErrors"
      :errorMessage="usernameErrorMessage"
    />

    <FormInput
      v-model="password"
      type="password"
      placeholder="Password"
      autocomplete="new-password"
      required
      :showErrors="showErrors"
      :errorMessage="passwordErrorMessage"
    />

    <FormInput
      v-model="repeatPassword"
      type="password"
      placeholder="Repeat Password"
      required
      :showErrors="showErrors"
      :errorMessage="repeatPasswordErrorMessage"
    />

    <button type="submit">Register</button>
  </form>
</template>

<script>
import FormInput from '@/components/FormInput.vue'

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      // если еще ни разу не было нажатия submit, то никакие ошибки не отображаем
      showErrors: false,
    }
  },
  computed: {
    usernameError() {
      return !this.username.length
    },
    usernameErrorMessage() {
      return this.usernameError ? 'Username is required' : ''
    },
    passwordError() {
      return !this.password.length
    },
    passwordErrorMessage() {
      return this.passwordError ? 'Password is required' : ''
    },
    repeatPasswordError() {
      return !(this.repeatPassword.length === 0 || this.password !== this.repeatPassword)
    },
    repeatPasswordErrorMessage() {
      if (this.repeatPassword.length === 0) return 'Please, repeat the password'
      if (this.password !== this.repeatPassword) return 'Passwords must match'
      return ''
    },
  },
  methods: {
    validateLoginForm() {
      this.showErrors = true
      if (this.usernameError || this.passwordError || this.repeatPasswordError) {
        return false
      }
      return true
    },

    handleSubmit() {
      if (!this.validateLoginForm()) return
    },
  },
}
</script>

<style scoped>
.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.invalid-input {
  min-height: 18px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
