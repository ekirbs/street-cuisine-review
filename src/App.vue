<template>
  <div class="app-container">
    <Navbar></Navbar>

    <!-- <div class="hist-nav">
      <button @click="redirect" class="button is-success">Redirect</button>
      <button @click="back" class="button is-light">Go Back</button>
      <button @click="forward" class="button is-dark">Go Forward</button>
    </div> -->
    <HistNav />

    <RouterView />

    <Footer></Footer>
  </div>
</template>

<script setup>
import { Footer, Navbar } from "./components/baseComponents";
import { HistNav } from "./components/homeComponents";
import { RouterView } from "vue-router";

// export default {
//   name: "App",
//   components: {
//     Header,
//     Footer,
//     Navbar,
//   },
//   methods: {
//     redirect() {
//       this.$router.push({ name: 'home' })
//     },
//     back () {
//       this.$router.go(-1)
//     },
//     forward () {
//       this.$router.go(1)
//     },
//   }
// };
</script>

<style scoped>
  @import 'bulma/css/bulma.min.css';
</style>
