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
    <div class="invalid-input" :style="{ visibility: showErrors ? 'visible' : 'hidden' }">
      {{ dbError }}
    </div>
  </form>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
import { db } from '@/firebase/index.js'
import {
  collection,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js'
import { useRouter } from 'vue-router'

export default {
  components: {
    FormInput,
  },
  data() {
    const router = useRouter()
    return {
      username: '',
      password: '',
      // если еще ни разу не было нажатия submit, то никакие ошибки не отображаем
      showErrors: false,
      dbError: '',
      router,
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
      const q = query(collection(db, 'users'), where('username', '==', username))
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
      this.router.push({ name: 'home' })

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
.input-group {
  margin-bottom: 15px;
}
h1{
  text-align: center;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.invalid-input {
  min-height: 18px;
  color: red;
  margin: 7px 0 7px 0;
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
