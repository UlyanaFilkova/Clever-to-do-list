<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style>
@import 'assets/css/index.css';

.wrapper {
  max-width: 762px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
