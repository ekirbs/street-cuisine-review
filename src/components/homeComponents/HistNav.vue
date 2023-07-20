<template>
  <div class="hist-nav-container">
    <button @click="redirect" class="button is-success">Redirect</button>
    <button @click="back" class="button is-light">Go Back</button>
    <button @click="forward" class="button is-dark">Go Forward</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const redirect = () => {
  router.push({ name: 'home'});
};

const back = () => {
  router.go(-1);
};

const forward = () => {
  router.go(1);
};

</script>

<style scoped>
  @import 'bulma/css/bulma.min.css';

  .hist-nav-container {
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