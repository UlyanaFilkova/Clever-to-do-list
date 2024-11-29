<template>
  <div class="login-container">
    <slot></slot>
    <div class="form-link">
      {{ linkText }}
      <router-link :to="linkTo" class="login__link">{{ linkAction }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginContainer',
  props: {
    linkText: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      required: true,
    },
    linkAction: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-link {
  margin: 0 auto;
  width: fit-content;
}

.login__link {
  color: #0056b3;
  text-decoration: underline;
}
.login__link:hover {
  cursor: pointer;
  text-decoration: none;
}
</style>
