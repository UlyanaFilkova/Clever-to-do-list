<template>
  <div class="todo-form">
    <CustomInput
      v-for="(field, index) in inputFields"
      :key="index"
      :modelValue="field.model"
      :placeholder="field.placeholder"
      :name="field.name"
      @update:modelValue="(value) => (field.model = value)"
    ></CustomInput>
    <input type="checkbox" :name="checkboxInput.name" v-model="checkboxInput.value" />
    <label for="isDone">is Done</label><br /><br />

    <button @click="handleAddTodo" :disabled="isAddButtonDisabled">Add Todo</button>
  </div>
</template>
<script>
import CustomInput from '@/components/Todo/CustomInput.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CustomInput,
  },
  computed: {
    ...mapState(['todos', 'activeDate', 'registrationDate', 'currentTodo']),
    isAddButtonDisabled() {
      // if both fields are empty
      return !this.inputFields[0].model.trim() && !this.inputFields[1].model.trim()
    },

    inputFields() {
      return [
        {
          model: this.currentTodo ? this.currentTodo.title : 'New Todo',
          placeholder: 'Title',
          name: 'title',
        },
        {
          model: this.currentTodo ? this.currentTodo.description : '',
          placeholder: 'Description',
          name: 'description',
        },
      ]
    },
    checkboxInput() {
      return { name: 'isDone', value: this.currentTodo ? this.currentTodo.isDone : false }
    },
  },

  methods: {
    ...mapActions(['addTodo, clearCurrentTodo']),
    handleAddTodo() {
      const newTodo = {
        title: this.inputFields[0].model,
        description: this.inputFields[1].model,
        date: new Date(),
        isDone: false,
      }
      this.addTodo(newTodo)

      // Reset input fields after adding
      this.inputFields.forEach((field) => {
        field.model = ''
      })

      this.clearCurrentTodo()
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
<style scoped></style>
