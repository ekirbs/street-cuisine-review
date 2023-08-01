<template>
  <div class="app-container">
    <Navbar></Navbar>

    <HistNav />

    <RouterView />

    <Footer></Footer>
  </div>
</template>

<script setup>
import { Footer, Navbar } from "./components/baseComponents";
import { HistNav } from "./components/homeComponents";
import { RouterView } from "vue-router";
</script>

<style scoped>
  @import 'bulma/css/bulma.min.css';
</style>
