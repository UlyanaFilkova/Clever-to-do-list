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
    <div v-if="showErrors" class="invalid-input">
      {{ dbError }}
    </div>
    <button type="submit">Register</button>
  </form>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
import { required, sameAs, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { registerUser, checkUsernameExists } from '@/services/auth.js'

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      showErrors: false,
      dbError: '',
    }
  },
  validations() {
    return {
      username: { required },
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs(this.password),
      },
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
      if (this.v$.password.$invalid && this.showErrors) {
        if (this.v$.password.required.$invalid) {
          return 'Password is required'
        } else if (this.v$.password.minLength.$invalid) {
          return 'Password must be at least 6 characters long'
        }
      }
      return ''
    },
    repeatPasswordErrorMessage() {
      if (this.v$.repeatPassword.$invalid && this.showErrors) {
        if (this.v$.repeatPassword.required.$invalid) {
          return 'Please, repeat the password'
        } else if (this.v$.repeatPassword.sameAsPassword.$invalid) {
          return 'Passwords must match'
        }
      }
      return ''
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

      const userExists = await checkUsernameExists(this.username)
      if (userExists) {
        this.dbError = 'This username is already taken'
        return
      }

      const userId = await registerUser(this.username, this.password)

      localStorage.setItem('userId', userId)
      this.$router.push({ name: 'home' })

      // Clear form after successful login
      this.username = ''
      this.password = ''
      this.repeatPassword = ''
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
