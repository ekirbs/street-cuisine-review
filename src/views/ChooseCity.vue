<template>
  <div class="select">
    <!-- <select v-model="currentUser.city" @change="onCityChange"> -->
    <select v-model="currentUser.city" @change="fetchVendorData">
      <option v-for="city in cities" :key="city" :value="city">
        {{ capitalizeCity(city) }}
      </option>
    </select>
  </div>
</template>

<script setup>
  const cities = ['boston', 'toronto'];

  

</script>

<style scoped></style>
