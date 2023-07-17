<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <Navbar></Navbar>

    <div class="hist-nav">
      <button @click="redirect" class="button is-success">Redirect</button>
      <button @click="back" class="button is-light">Go Back</button>
      <button @click="forward" class="button is-dark">Go Forward</button>
    </div>

    <RouterView />

    <Footer></Footer>
  </div>
</template>

<script>
import { Header, Footer, Navbar } from "./components/baseComponents";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Navbar,
  },
  methods: {
    redirect() {
      this.$router.push({ name: 'home' })
    },
    back () {
      this.$router.go(-1)
    },
    forward () {
      this.$router.go(1)
    },
  }
};
</script>

<style scoped>
  @import 'bulma/css/bulma.min.css';

  .hist-nav {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: thistle;
    min-height: 8vh;
    width: 50vw;
    margin: 5px auto;
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 1px 1px 2px black;
  }

  .button {
    margin: 5px;
    width: 125px;
    border: 2px solid black;
    box-shadow: 1px 1px 2px black;
  }
</style>
