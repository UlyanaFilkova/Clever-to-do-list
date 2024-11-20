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
import { firebase } from '@/firebase/firebase.config.js'
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
  validations() {
    return {
      username: { required },
      password: { required },
      repeatPassword: {
        required,
        sameAsPassword: sameAs(this.password)
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
      return this.v$.password.$invalid && this.showErrors ? 'Password is required' : ''
    },
    repeatPasswordErrorMessage() {
      if (this.v$.repeatPassword.$invalid && this.showErrors) {
        if (this.v$.repeatPassword.required.$invalid) {
          return 'Please, repeat the password' 
        } else if (this.v$.repeatPassword.sameAsPassword.$invalid) {
          return 'Passwords must match' 
        }
      }
      return '' // No error
    },
    // usernameError() {
    //   return !this.username.length
    // },
    // usernameErrorMessage() {
    //   return this.usernameError ? 'Username is required' : ''
    // },
    // passwordError() {
    //   return !this.password.length
    // },
    // passwordErrorMessage() {
    //   return this.passwordError ? 'Password is required' : ''
    // },
    // repeatPasswordError() {
    //   return this.repeatPassword.length === 0 || this.password !== this.repeatPassword
    // },
    // repeatPasswordErrorMessage() {
    //   if (this.repeatPassword.length === 0) return 'Please, repeat the password'
    //   if (this.password !== this.repeatPassword) return 'Passwords must match'
    //   return ''
    // },
  },
  methods: {
    // validateLoginForm() {
    //   this.showErrors = true
    //   if (this.usernameError || this.passwordError || this.repeatPasswordError) {
    //     return false
    //   }
    //   return true
    // },

    async checkUsernameExists(username) {
      const q = query(collection(firebase, 'users'), where('username', '==', username))
      const querySnapshot = await getDocs(q)
      return !querySnapshot.empty // true, если пользователь существует
    },

    async handleSubmit() {
      this.showErrors = true
      // if (!this.validateLoginForm()) {
      //   return
      // }
      this.v$.$touch() // Mark all fields as touched

      if (this.v$.$invalid) {
        return
      }

      const userExists = await this.checkUsernameExists(this.username)
      if (userExists) {
        this.dbError = 'This username is already taken'
        return
      }

      try {
        // Добавление данных в Firestore
        const docRef = await addDoc(collection(firebase, 'users'), {
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
