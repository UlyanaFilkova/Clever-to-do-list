<template>
  <form @submit.prevent="handleSubmit">
    <h1>Create an account</h1>
    <FormInput
      v-for="(field, index) in inputFields"
      :key="index"
      :modelValue="field.model"
      :type="field.type"
      :placeholder="field.placeholder"
      :name="field.name"
      :autocomplete="field.autocomplete"
      :required="field.required"
      :errorMessage="field.errorMessage"
      @update:modelValue="(value) => (field.model = value)"
    />
    <div class="invalid-input">
      {{ errorMessage }}
    </div>
    <button type="submit" :disabled="submitButtonDisabled || requestIsProcessing">Register</button>
  </form>
</template>

<script>
import FormInput from '@/components/auth/FormInput.vue'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { registerUser, checkUsernameExists } from '@/services/auth.js'

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      v$: useVuelidate(),
      errorMessage: '',
      requestIsProcessing: false,
      inputFields: [
        {
          model: '',
          type: 'email',
          placeholder: 'Email',
          name: 'username',
          autocomplete: 'username',
          required: true,
          errorMessage: '',
        },
        {
          model: '',
          type: 'password',
          placeholder: 'Password',
          name: 'password',
          autocomplete: 'new-password',
          required: true,
          errorMessage: '',
        },
        {
          model: '',
          type: 'password',
          placeholder: 'Repeat Password',
          name: 'repeat-password',
          autocomplete: 'new-password',
          required: true,
          errorMessage: '',
        },
      ],
    }
  },
  validations() {
    return {
      validationFields: {
        username: { required, email },
        password: { required, minLength: minLength(6) },
        repeatPassword: { required, sameAsPassword: sameAs(this.inputFields[1].model) },
      },
    }
  },
  computed: {
    validationFields() {
      return {
        username: this.inputFields[0].model,
        password: this.inputFields[1].model,
        repeatPassword: this.inputFields[2].model,
      }
    },
    submitButtonDisabled() {
      return (
        this.v$.validationFields.username.required.$invalid ||
        this.v$.validationFields.password.required.$invalid ||
        this.v$.validationFields.repeatPassword.required.$invalid
      )
    },
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = ''
      this.v$.validationFields.$touch()

      if (this.v$.validationFields.$invalid) {
        if (this.v$.validationFields.username.required.$invalid) {
          this.errorMessage = 'Email is required'
        } else if (this.v$.validationFields.username.email.$invalid) {
          this.errorMessage = 'Invalid email'
        } else if (this.v$.validationFields.password.required.$invalid) {
          this.errorMessage = 'Password is required'
        } else if (this.v$.validationFields.password.minLength.$invalid) {
          this.errorMessage = 'Password must be at least 6 characters long'
        } else if (this.v$.validationFields.repeatPassword.required.$invalid) {
          this.errorMessage = 'Please, repeat the password'
        } else if (this.v$.validationFields.repeatPassword.sameAsPassword.$invalid) {
          this.errorMessage = 'Passwords must match'
        }
      } else {
        this.requestIsProcessing = true
        const userExists = await checkUsernameExists(this.inputFields[0].model)
        if (userExists) {
          this.errorMessage = 'This username is already taken'
          this.requestIsProcessing = false
          return
        }
        const result = await registerUser(this.inputFields[0].model, this.inputFields[1].model)
        if (result === true) {
          this.$router.push({ name: 'home' })
          // Clear form after successful login
          this.inputFields[0].model = ''
          this.inputFields[1].model = ''
          this.inputFields[2].model = ''
          this.requestIsProcessing = false
          return
        }
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
  background-color: #fb6914;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover {
  background-color: #d74f00;
}
button:disabled {
  background-color: #808080;
  cursor: auto;
}
.invalid-input {
  font-size: 12px;
  line-height: 12px;
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>
