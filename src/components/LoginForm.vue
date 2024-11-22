<template>
  <form @submit.prevent="handleSubmit">
    <h1>Login</h1>
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
    <button type="submit">Login</button>
  </form>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
import { required, email, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { checkUser } from '@/services/auth.js'

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      v$: useVuelidate(),
      errorMessage: '',
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
          autocomplete: 'current-password',
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
      },
    }
  },
  computed: {
    validationFields() {
      return {
        username: this.inputFields[0].model,
        password: this.inputFields[1].model,
      }
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
        }
      } else {
        const result = await checkUser(this.inputFields[0].model, this.inputFields[1].model)
        if (result === true) {
          this.$router.push({ name: 'home' })
          // Clear form after successful login
          this.inputFields[0].model = ''
          this.inputFields[1].model = ''
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
