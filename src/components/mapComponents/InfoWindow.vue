<template>
  <div class="iw-container">
    <p v-if="vendor" class="iw-v-name">{{ vendor.name }}</p>
    <p v-if="vendor" class="id-v-description">{{ vendor.description }}</p>
    <p v-if="!vendor">Vendor info not available.</p>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    vendor: Object,
  });
</script>

<style scoped>
.iw-container {
  max-width: 200px;
}
  .iw-v-name {
    text-decoration: underline;
  }



</style>