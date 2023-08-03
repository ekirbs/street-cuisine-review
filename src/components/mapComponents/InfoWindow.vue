<template>
  <div class="iw-container">
    <p v-if="vendor" class="iw-v-name">{{ vendor.name }}</p>
    <p v-if="vendor" class="iw-v-description">{{ vendor.description }}</p>

    <router-link
      :to="{
        name: 'single-vendor',
        params: { city: vendor.city, identifier: vendor.identifier},
      }"
      v-if="vendor"
      class="iw-vendor"
    >
      <button class="iw-button button is-success">Go To Vendor</button>
    </router-link>


    <p v-if="!vendor">Vendor info not available.</p>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
  import { defineProps } from 'vue';

  const props = defineProps({
    vendor: Object,
  });
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.iw-container {
  max-width: 200px;
}
  .iw-v-name {
    text-decoration: underline;
  }



</style>