<template>
  <div class="home-container">
    <!-- <div class="title has-text-centered home-title-card">
      <h2>Street Cuisine Review</h2>
    </div> -->
    <!-- <main class="home-main">
      <p>Your one-stop shop to fine dining on the streets.</p>
    </main> -->
    <CitySelector></CitySelector>
    <Clock></Clock>
    <Map></Map>
    <Weather></Weather>
  </div>
</template>

<script>
import {
  CitySelector,
  Clock,
  Map,
  Weather,
} from '../components/homeComponents';

export default {
  name: 'Home',
  components: {
    CitySelector,
    Clock,
    Map,
    Weather,
  },
};
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.home-container {
  background-color: var(--transparentSlate);
  width: 75vw;
  min-height: 100vh;
  border-radius: 10px;
  margin: 10px auto;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* .home-title-card {
  background-color: var(--primeGreen);
  border-radius: 10px;
  width: 350px;
  margin: 10px auto;
  padding: 5px;
} */

/* .home-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */
</style>
