<template>
  <div class="home-container">
    <h1>Street Cuisine Review</h1>
    <main class="home-main">
      <p>Your one-stop shop to fine dining on the streets.</p>
      <h1 class="clock-time">Current Time: {{  currentTime }}</h1>
    </main>
    <Weather2></Weather2>
  </div>
</template>

<script>
import { Weather, Weather2 } from "../components/homeComponents";

export default {
  name: "Home",
  components: {
    Weather,
    Weather2,
  },
  data() {
    return {
      currentTime: '',
      intervalId: null
    }
  },
  methods: {
    setCurrentTime() {
      const date = new Date();
      const formattedTime = date.toLocaleTimeString('en-US');
      this.currentTime = formattedTime;
    }
  },
  created() {
    this.setCurrentTime();
    this.intervalId = setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.home-container {
  background-color: aquamarine;
  width: 75vw;
  min-height: 100vh;
  border-radius: 10px;
  margin: 10px auto;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.home-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
