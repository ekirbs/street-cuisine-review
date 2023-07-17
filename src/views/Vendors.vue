<template>
  <div v-if="isLoading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="vendors-container">
      <div v-for="vendor in data" :key="vendor.name" class="vendor-card">
        <RouterLink
          :to="{ name: 'single-vendor', params: { identifier: vendor.identifier } }"
          class="vendor"
        >
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
          <p>Identifier: {{ vendor.identifier }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from 'vue-router';
import { API_BASE_URL } from "../../config";

export default {
  name: "Streetfood",
  data() {
    return {
      // vendorData: null,
      isLoading: true,
      data: []
    };
  },
  mounted() {
    this.fetchVendorData();
  },
  methods: {
    fetchVendorData() {
      const streetfoodApiUrl = `${API_BASE_URL}/streetfood`;
      // const streetfoodApiUrl = `${API_BASE_URL}/api/streetfood`;

      axios
        .get(streetfoodApiUrl)
        .then((response) => {
          this.vendorData = response.data;
          console.log("vendorData: ", this.vendorData);

          const vendorList = Object.values(this.vendorData)[1];
          console.log("vendorList: ", vendorList);

          this.data = Object.values(vendorList).map((vendor) => ({
            name: vendor.name,
            logo: vendor.images?.logo_small,
            website: vendor.url,
            phone: vendor.phone,
            description: vendor.description,
            payment_methods: vendor.payment_methods,
            rating: vendor.rating,
            identifier: vendor.identifier,
          }));

          console.log("data: ", this.data);

          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error fetching streetfood data:", error);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

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