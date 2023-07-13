<template>
  <div class="home-container">
    <h1>Street Cuisine Review</h1>
    <main>
      <p>Your one-stop shop to fine dining on the streets.</p>
    </main>
    <Weather></Weather>
  </div>
</template>

<script>
import { Weather } from "../components/homeComponents";

export default {
  name: "Home",
  components: {
    Weather,
  },
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.home-container {
  background-color: aquamarine;
  width: 75vw;
  height: 100vh;
  border-radius: 10px;
  margin: 10px auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

/* @media (min-width: 1024px) {
    .home {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  } */
</style>
