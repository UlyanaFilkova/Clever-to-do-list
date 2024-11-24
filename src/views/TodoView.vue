<template>
  <div class="container">
    <TodoHeader />
    <CustomInput
      v-for="(field, index) in inputFields"
      :key="index"
      :modelValue="field.model"
      :placeholder="field.placeholder"
      :name="field.name"
      @update:modelValue="(value) => (field.model = value)"
    ></CustomInput>
  </div>
</template>
<script>
import TodoHeader from '@/components/TodoHeader.vue'
import CustomInput from '@/components/CustomInput.vue'

export default {
  components: {
    TodoHeader,
    CustomInput,
  },
  props: {
    todo: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        date: new Date(),
        isDone: false,
      }),
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
}
</script>
<style scoped>
.container {
  height: 100vh;
}
</style>
