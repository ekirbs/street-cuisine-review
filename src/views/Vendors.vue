<template>
  <div class="vendors-container">
    <div class="select">
      <!-- <select v-model="currentUser.city" @change="onCityChange"> -->
      <select v-model="currentUser.city" @change="fetchVendorData">
        <option v-for="city in cities" :key="city" :value="city">
          {{ capitalizeCity(city) }}
        </option>
      </select>
    </div>
    <div v-if="isLoading">
      <font-awesome-icon :icon="['fas', 'spinner']" spin />
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="vendors-container">
        <div v-for="vendor in data" :key="vendor.name" class="vendor-card">
          <router-link
            :to="{
              name: 'single-vendor',
              params: { city: currentUser.city, identifier: vendor.identifier },
            }"
            class="vendor"
          >
            <h1>Name: {{ vendor.name }}</h1>
            <img v-if="vendor.logo" :src="vendor.logo" alt="vendor logo" />
            <font-awesome-icon
              :icon="['fas', 'truck']"
              v-else
              class="truck-icon"
            />

            <p>Website: {{ vendor.website }}</p>
            <p>Phone #: {{ vendor.phone }}</p>
            <p>Description: {{ vendor.description }}</p>
            <p>Identifier: {{ vendor.identifier }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { API_BASE_URL } from '../../config';
import { useStore } from 'vuex';

// vuex store
const store = useStore();
const currentUser = store.state.currentUser;
console.log("currentUser.city:", currentUser.city);
// const currentCity = computed(() => currentUser.city);

// const onCityChange = () => {
//   store.commit('setCity', currentCity);
//   fetchVendorData();
// };

// refs
const isLoading = ref(true);
const data = ref([]);
const cities = ['boston', 'toronto'];

// api fetch
const fetchVendorData = () => {
  const vendorsApiUrl = `${API_BASE_URL}/vendors/${currentUser.city}`;
  console.log("in fetchVendorData currentUser.city:", currentUser.city);

  axios
    .get(vendorsApiUrl)
    .then((response) => {
      const vendorData = response.data.vendors;
      console.log('Vendor Data:', vendorData);

      data.value = Object.values(vendorData).map((vendor) => ({
          name: vendor.name,
          logo: vendor.images?.logo_small,
          website: vendor.url,
          phone: vendor.phone,
          description: vendor.description,
          payment_methods: vendor.payment_methods,
          rating: vendor.rating,
          identifier: vendor.identifier,
        }));

      isLoading.value = false;
    })
    .catch((error) => {
      console.error('Error fetching streetfood data:', error);
      isLoading.value = false;
    });
};

// onMounted(onCityChange);
onMounted(fetchVendorData);

watch(() => currentUser.city, (newValue, oldValue) => {
  if (newValue !==oldValue) {
    isLoading.value = true;
    fetchVendorData();
  }
});

const capitalizeCity = (city) => {
  if(!city) return '';
  return city.replace(/\b\w/g, (char) => char.toUpperCase());
};
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.vendors-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.vendor-card {
  padding: 25px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  margin: 1em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75vw;

  background-color: antiquewhite;
}

.vendor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.truck-icon {
  height: 75px;
  width: 75px;
}
</style>
