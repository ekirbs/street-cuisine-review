<template>
  <div class="vendor-container">
    <div v-if="isLoading">
      <font-awesome-icon :icon="['fas', 'spinner']" spin />
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="vendor-card" v-if="vendor">
        <h1>Name: {{ vendor.name }}</h1>
        <img
          v-if="vendor.logo"
          :src="vendor.logo"
          alt="vendor logo"
        />
        <font-awesome-icon :icon="['fas', 'truck']" v-else class="truck-icon"/>
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

// refs
const vendorIdentifier = ref(null);
const city = ref(null);
const vendor = ref(null);
const isLoading = ref(true);

onMounted(() => {
  vendorIdentifier.value = route.params.identifier;
  city.value = route.params.city;
  console.log("route.params.identifier:", route.params.identifier);
  console.log("route.params.city:", route.params.city);
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
  console.log("City:", city.value);
  const vendorApiUrl = `${API_BASE_URL}/vendors/${city.value}`;
  console.log("vendorApiUrl:", vendorApiUrl);

  axios
    .get(vendorApiUrl)
    .then((response) => {
      const vendorData = response.data.vendors;
      console.log("vendor data:", vendorData);
      const chosenVendor = vendorData[vendorIdentifier.value];
      if (chosenVendor) {
        vendor.value = {
          name: chosenVendor.name,
          logo: chosenVendor.images?.logo_small,
          website: chosenVendor.website,
          phone: chosenVendor.phone,
          description: chosenVendor.sdescription,
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
  margin: 10px auto;
  padding: 15px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.vendor-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>