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
  // props: {
  //   todo: {
  //     type: Object,
  //     default: () => ({
  //       title: '',
  //       description: '',
  //       date: new Date(),
  //       isDone: false,
  //     }),
  //   },
  // },
  computed: {
    ...mapState(['todos', 'activeDayIndex', 'registrationDate']),
    isAddButtonDisabled() {
      // if both fields are empty
      return !this.inputFields[0].model.trim() && !this.inputFields[1].model.trim()
    },
  },

  data() {
    return {
      inputFields: [
        {
          model: '',
          placeholder: 'Title',
          name: 'title',
        },
        {
          model: '',
          placeholder: 'Description',
          name: 'description',
        },
      ],
    }
  },
  
  methods: {
    ...mapActions(['addTodo']),
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
    },
  },
}
</script>
<style scoped></style>
