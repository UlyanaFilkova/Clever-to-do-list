<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <input type="text" v-model="username" placeholder="Username" />
        <div
          class="invalid-input"
          :style="{ visibility: showErrors ? 'visible' : 'hidden' }"
        >
          {{ usernameErrorMessage }}
        </div>
      </div>

      <div class="input-group">
        <input type="password" v-model="password" placeholder="Password" />
        <div
          class="invalid-input"
          :style="{ visibility: showErrors ? 'visible' : 'hidden' }"
        >
          {{ passwordErrorMessage }}
        </div>
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
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
  },
  methods: {
    // validateLogin() {
    //   if (this.username) {
    //     this.usernameError = false
    //     this.usernameErrorMessage = ''
    //   } else {
    //     this.usernameError = true
    //     this.usernameErrorMessage = 'Username is required'
    //   }
    // },

    // validatePassword() {
    //   if (this.password) {
    //     this.passwordError = false
    //     this.passwordErrorMessage = ''
    //   } else {
    //     this.passwordError = true
    //     this.passwordErrorMessage = 'Password is required'
    //   }
    // },

    validateLoginForm() {
      //   this.validateLogin()
      //   this.validatePassword()

      this.showErrors = true
      if (this.usernameError || this.passwordError) {
        return false
      }
      return true
    },

    handleSubmit() {
      if (!this.validateLoginForm()) return

      console.log('Username:', this.username)
      console.log('Password:', this.password)
    },
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
