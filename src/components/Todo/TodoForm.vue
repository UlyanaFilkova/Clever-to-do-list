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
    <MediumButton
      @click="handleAddTodo"
      :disabled="isAddButtonDisabled"
      :text="this.currentTodo ? 'Update Todo' : 'Add new Todo'"
    >
    </MediumButton>
  </div>
</template>
<script>
import CustomInput from '@/components/Todo/CustomInput.vue'
import MediumButton from '@/components/Todo/MediumButton.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CustomInput,
    MediumButton,
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
  mounted() {
    if (this.currentTodo) {
      this.inputFields[0].model = this.currentTodo.title
      this.inputFields[1].model = this.currentTodo.description
      this.inputFields[2].model = this.currentTodo.isDone
    }
  },

  computed: {
    ...mapState(['todos', 'activeDate', 'registrationDate']),
    ...mapGetters(['currentTodo']),
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
}
</script>
<style scoped></style>
