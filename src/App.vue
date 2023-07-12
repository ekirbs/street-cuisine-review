<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <Navbar></Navbar>

    <RouterView />

    <Footer></Footer>
  </div>
</template>

<script>
import { Header, Footer, Navbar } from "./components/mainComponents";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Navbar,
  },
};
</script>

<style scoped></style>
