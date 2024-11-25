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
    <input type="checkbox" :name="checkboxInput.name" v-model="checkboxInput.model" />
    <label for="isDone">is Done</label><br /><br />

    <button @click="handleAddTodo" :disabled="isAddButtonDisabled">
      {{ this.currentTodo ? 'Update Todo' : 'Add new Todo' }}
    </button>
  </div>
</template>
<script>
import CustomInput from '@/components/Todo/CustomInput.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CustomInput,
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
      checkboxInput: {
        name: 'isDone',
        model: false,
      },
    }
  },
  mounted() {
    if (this.currentTodo) {
      this.inputFields[0].model = this.currentTodo.title
      this.inputFields[1].model = this.currentTodo.description
      this.checkboxInput.model = this.currentTodo.isDone
    }
  },

  computed: {
    ...mapState(['todos', 'activeDate', 'registrationDate', 'currentTodo']),
    // watch:{
    //   currentTodo: {
    //     this.inputFields.model[0] = this.currentTodo.title
    //   }
    // },
    // currentFields() {
    //   return {
    //     title: this.currentTodo ? this.currentTodo.title : '',
    //     description: this.currentTodo ? this.currentTodo.description : '',
    //   }
    // },
    isAddButtonDisabled() {
      // if both fields are empty
      return !this.inputFields[0].model.trim() && !this.inputFields[1].model.trim()
    },

    // inputFields() {
    //   return [
    //     {
    //       model: this.currentTodo ? this.currentTodo.title : '',
    //       placeholder: 'Title',
    //       name: 'title',
    //     },
    //     {
    //       model: this.currentTodo ? this.currentTodo.description : '',
    //       placeholder: 'Description',
    //       name: 'description',
    //     },
    //   ]
    // },
    // checkboxInput() {
    //   return { name: 'isDone', model: this.currentTodo ? this.currentTodo.isDone : false }
    // },
  },

  methods: {
    ...mapActions(['addTodo', 'updateTodo', 'clearCurrentTodo']),
    async handleAddTodo() {
      const newTodo = {
        title: this.inputFields[0].model,
        description: this.inputFields[1].model,
        isDone: this.checkboxInput.model,
      }
      if (this.currentTodo) {
        // edit current todo
        newTodo.date = this.currentTodo.date
        await this.updateTodo(newTodo)
      } else {
        // add new todo
        newTodo.date = new Date()
        await this.addTodo(newTodo)
      }
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
