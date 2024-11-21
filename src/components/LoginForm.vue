<template>
  <form @submit.prevent="handleSubmit">
    <h1>Login</h1>
    <FormInput
      v-model="username"
      type="text"
      placeholder="Username"
      name="username"
      autocomplete="username"
      required
      :showErrors="showErrors"
      :errorMessage="usernameErrorMessage"
    />

    <FormInput
      v-model="password"
      type="password"
      placeholder="Password"
      name="password"
      autocomplete="current-password"
      required
      :showErrors="showErrors"
      :errorMessage="passwordErrorMessage"
    />
    <!-- <FormInput
      v-for="(field, index) in inputFields"
      :key="index"
      v-model="field.model"
      :type="field.type"
      :placeholder="field.placeholder"
      :name="field.name"
      :autocomplete="field.autocomplete"
      :required="field.required"
      :showErrors="field.showErrors"
      :errorMessage="field.errorMessage"
    /> -->

    <div v-if="showErrors" class="invalid-input">
      {{ dbError }}
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { authService } from '@/services/auth.js'

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      username: '',
      password: '',
      showErrors: false,
      dbError: '',
    }
  },
  validations() {
    return {
      username: { required },
      password: { required },
    }
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  computed: {
    usernameErrorMessage() {
      return this.v$.username.$invalid && this.showErrors ? 'Username is required' : ''
    },
    passwordErrorMessage() {
      return this.v$.password.$invalid && this.showErrors ? 'Password is required' : ''
    },
    inputFields() {
      // здесь нужны реактивные ссылки, а не значения
      // в Composition API я бы использовала reactive/ref
      // в data() нельзя использовать computed значения, а мне они нужны для ошибок
      return [
        {
          model: this.username,
          type: 'text',
          placeholder: 'Username',
          name: 'username',
          autocomplete: 'username',
          required: true,
          showErrors: this.showErrors,
          errorMessage: this.usernameErrorMessage,
        },
      ]
    },
  },
  methods: {
    async handleSubmit() {
      this.showErrors = true

      // validation
      this.v$.$touch() // Mark all fields as touched
      if (this.v$.$invalid) {
        return
      }

      const userId = await authService.checkUser(this.username, this.password)
      if (!userId) {
        this.dbError = 'Invalid username or password'
        return
      }

      localStorage.setItem('userId', userId)
      this.$router.push({ name: 'home' })

      // Clear form after successful login
      this.username = ''
      this.password = ''
      this.showErrors = false
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: #0056b3;
}
.invalid-input {
  font-size: 12px;
  line-height: 12px;
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>
