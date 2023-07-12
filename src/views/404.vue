<template>
  <div id="404-container">
    <h1>WRONG TURN!!</h1>
    <h3>The page you are looking for is on another street!</h3>
    <img
      src="../assets/images/404-not-found.webp"
      alt="404 page"
      class="wrong-img"
    />

    <button @click="goBack" class="button">Get me out of here!</button>
  </div>
</template>

<script setup>
const goBack = (e) => {
  e.preventDefault();
  history.back();
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.wrong-img {
  height: 50vh;
  width: auto;
}
</style>
