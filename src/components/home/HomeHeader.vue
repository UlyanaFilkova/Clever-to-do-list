<template>
  <header class="header">
    <h2>To-do List</h2>
    <BaseButton @click="logout" text="Logout" class="small-button"></BaseButton>
  </header>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    BaseButton,
  },
  methods: {
    ...mapActions(['logout']),
  },
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 20px 0;
  padding-top: 0px;
}
@media (max-width: 576px) {
  h2 {
    font-size: 20px;
  }
}
</style>
