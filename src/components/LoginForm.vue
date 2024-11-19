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

    <button type="submit">Login</button>
    <div v-if='showErrors' class="invalid-input">
      {{ dbError }}
    </div>
  </form>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
import { firebase } from '@/firebase/firebase.config.js'
import {
  collection,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      username: '',
      password: '',
      // если еще ни разу не было нажатия submit, то никакие ошибки не отображаем
      showErrors: false,
      dbError: ''
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
  },
  methods: {
    validateLoginForm() {
      this.showErrors = true
      if (this.usernameError || this.passwordError) {
        return false
      }
      return true
    },

    async checkUser(username, password) {
      const q = query(collection(firebase, 'users'), where('username', '==', username))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data()
        return userData.password === password // Сравнение паролей
      }
      return false // Пользователь не найден
    },

    async handleSubmit() {
      if (!this.validateLoginForm()) return

      const credentialsValid = await this.checkUser(this.username, this.password)
      if (!credentialsValid) {
        this.dbError = 'Invalid username or password.'
        return
      }

      console.log('Login successful!')
      this.$router.push({ name: 'home' })

      // Очистка формы после успешной регистрации
      this.username = ''
      this.password = ''
      this.repeatPassword = ''
      this.showErrors = false
    },
  },
}
</script>

<style scoped>
h1{
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
}

button:hover {
  background-color: #0056b3;
}
</style>
