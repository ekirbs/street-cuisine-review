<template>
  <div class="vendor-container">
    <div v-if="isLoading">
      <font-awesome-icon :icon="['fas', 'spinner']" spin />
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="vendor-card" v-if="vendor">
        <h1>Name: {{ vendor.name }}</h1>
        <img :src="vendor.logo" alt="vendor logo">
        <p>Website: {{ vendor.website }}</p>
        <p>Phone #: {{ vendor.phone }}</p>
        <p>Description: {{ vendor.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { API_BASE_URL } from "../../config";

const route = useRoute();
const vendorIdentifier = ref(null);
const vendor = ref(null);
const isLoading = ref(true);

onMounted(() => {
  vendorIdentifier.value = route.params.identifier;
  console.log("route.params.identifier:", route.params.identifier);
  console.log("vendorIdentifier:", vendorIdentifier.value);
  fetchVendorData();
});

watch(() => route.params.identifier, (newValue) => {
  vendorIdentifier.value = newValue;
  console.log("vendorIdentifier updated:", newValue);
  fetchVendorData();
});

const fetchVendorData = () => {
  console.log("Fetching vendor data for identifier:", vendorIdentifier.value)
  const vendorApiUrl = `${API_BASE_URL}/streetfood/${vendorIdentifier.value}`;

  axios
    .get(vendorApiUrl)
    .then((response) => {
      const vendorData = response.data.vendors[vendorIdentifier.value];
      if (vendorData) {
        vendor.value = {
          name: vendorData.name,
          logo: vendorData.images?.logo_small,
          website: vendorData.website,
          phone: vendorData.phone,
          description: vendorData.description,
        };
      } else {
        vendor.value = null;
      }
      isLoading.value = false;
    })
    .catch((error) => {
      console.error("Error fetching vendor data:", error);
      isLoading.value = false;
    });
};
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.vendor-container {
  min-height: 75vh;
  width: 75vw;
  background-color: ghostwhite;
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 1px 1px 2px black;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>