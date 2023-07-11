<template>
  <div class="header-container">
    <RouterLink to="/">
      <h1>Boston Street Cuisine</h1>
    </RouterLink>
    <img src="../../assets/images/logo.png" class="logoImg" alt="the logo">
    <p>Your one-stop shop for fine dining on the streets.</p>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header-container {
  height: 10vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.logoImg {
  padding-top: 30px;
  width: 100px;
  height: auto;
  margin: 0 25px;
}

</style>