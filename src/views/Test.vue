<template>
  <div class="test-container">
    <h1>This is the test bed for components and other blocks.</h1>
    <Map></Map>
    <Weather></Weather>
  </div>
</template>

<script>
  import { Map, Weather } from "../components/homeComponents";

  export default {
    name: "Test",
    components: {
      Map,
      Weather,
    }
  }
</script>

<style scoped>
  .test-container {
    background-color: wheat;
    min-height: 80vh;
    min-width: 75vw;
    width: 90vw;
    margin: 10px auto;
    padding: 10px;
    border: 2px solid black;
    border-radius: 10px;;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>