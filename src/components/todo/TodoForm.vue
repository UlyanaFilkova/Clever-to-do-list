<template>
  <div class="todo-form">
    <CustomInput
      v-for="(field, index) in inputFields"
      :key="index"
      :modelValue="field.model"
      :placeholder="field.placeholder"
      :type="field.type"
      :name="field.name"
      @update:modelValue="(value) => (field.model = value)"
    ></CustomInput>
    <BaseButton
      @click="handleAddTodo"
      :disabled="isAddButtonDisabled"
      :text="this.currentTodo ? 'Update Todo' : 'Add new Todo'"
      class="big-button submit-button"
    >
    </BaseButton>
  </div>
</template>
<script>
import CustomInput from '@/components/todo/CustomInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CustomInput,
    BaseButton,
  },
  data() {
    return {
      inputFields: [
        {
          model: '',
          placeholder: 'Title',
          name: 'title',
          type: 'text',
        },
        {
          model: '',
          placeholder: 'Description',
          name: 'description',
          type: 'textarea',
        },
        {
          model: false,
          placeholder: 'is done',
          name: 'isDone',
          type: 'checkbox',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(['currentTodo', 'todos', 'activeDate', 'registrationDate']),
    isAddButtonDisabled() {
      if (this.currentTodo) {
        return (
          this.inputFields[0].model.trim() === this.currentTodo.title &&
          this.inputFields[1].model.trim() === this.currentTodo.description &&
          this.inputFields[2].model === this.currentTodo.isDone
        )
      } else {
        // if both fields are empty
        return !this.inputFields[0].model.trim() && !this.inputFields[1].model.trim()
      }
    },
  },

  methods: {
    ...mapActions(['addTodo', 'updateTodo', 'clearCurrentTodo']),
    async handleAddTodo() {
      const newTodo = {
        title: this.inputFields[0].model ? this.inputFields[0].model : 'New task',
        description: this.inputFields[1].model,
        isDone: this.inputFields[2].model,
      }
      if (this.currentTodo) {
        // edit current todo
        newTodo.date = this.currentTodo.date
        await this.updateTodo(newTodo)
      } else {
        // add new todo
        newTodo.date = this.activeDate
        await this.addTodo(newTodo)
      }
      // Reset input fields after adding
      this.inputFields.forEach((field) => {
        field.model = ''
      })
      this.inputFields[2].model = false

      this.clearCurrentTodo()

      this.$router.push({ name: 'home' })
    },
  },
  mounted() {
    if (this.currentTodo) {
      this.inputFields[0].model = this.currentTodo.title
      this.inputFields[1].model = this.currentTodo.description
      this.inputFields[2].model = this.currentTodo.isDone
    }
  },
}
</script>

<style scoped>
.submit-button {
  margin: 30px auto 0 auto;
}
</style>
