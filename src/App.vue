<script>
import { RouterView } from 'vue-router';

export default {
  components: {
    RouterView
  }
};
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style>
  .wrapper{
    max-width: 762px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>