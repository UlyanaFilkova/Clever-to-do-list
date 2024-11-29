<template>
  <div class="todo-form">
    <component
      v-for="(field, index) in inputFields"
      :is="field.type"
      :key="index"
      :modelValue="field.model"
      :placeholder="field.placeholder"
      :name="field.name"
      :text="field.text"
      @update:modelValue="(value) => (field.model = value)"
    />
    <BaseButton
      :disabled="isAddButtonDisabled"
      :text="baseButtonText"
      class="big-button submit-button"
      @click="handleAddTodo"
    />
  </div>
</template>
<script>
import BaseInput from '@/components/base/BaseInput.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { mapGetters, mapActions } from 'vuex'
import { markRaw } from 'vue'

export default {
  components: {
    BaseInput,
    BaseCheckbox,
    BaseTextarea,
    BaseButton,
  },
  data() {
    return {
      inputFields: [
        {
          model: '',
          label: 'Title',
          name: 'title',
          type: markRaw(BaseInput),
        },
        {
          model: '',
          label: 'Description',
          name: 'description',
          type: markRaw(BaseTextarea),
        },
        {
          model: false,
          text: 'is done',
          name: 'is-done',
          type: markRaw(BaseCheckbox),
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
    baseButtonText() {
      return this.currentTodo ? 'Update Todo' : 'Add new Todo'
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
