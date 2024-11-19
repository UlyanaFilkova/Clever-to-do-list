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
  addDoc,
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
      repeatPassword: '',
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
    repeatPasswordError() {
      return this.repeatPassword.length === 0 || this.password !== this.repeatPassword
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

    async checkUsernameExists(username) {
      const q = query(collection(db, 'users'), where('username', '==', username))
      const querySnapshot = await getDocs(q)
      return !querySnapshot.empty // true, если пользователь существует
    },

    async handleSubmit() {
      console.log('Form submitted')
      console.log(import.meta.env)
      if (!this.validateLoginForm()) {
        return
      }

      const userExists = await this.checkUsernameExists(this.username)
      if (userExists) {
        this.dbError = 'This username already exists.'
        return
      }

      try {
        // Добавление данных в Firestore
        const docRef = await addDoc(collection(db, 'users'), {
          username: this.username,
          password: this.password, // TODO: хэшировать пароли
        })

        console.log('Document written with ID: ', docRef.id)

        this.router.push({ name: 'home' })

        // Очистка формы после успешной регистрации
        this.username = ''
        this.password = ''
        this.repeatPassword = ''
        this.showErrors = false
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
  },
}
</script>

<style scoped>
.input-group {
  margin-bottom: 15px;
}

h1 {
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
