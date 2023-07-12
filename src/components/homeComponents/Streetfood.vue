<template>
  <div v-if="isLoading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="streetfood-container">
      <h1>Name: {{ vendorData. }}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../../../config";

export default {
  name: "Streetfood",
  data() {
    return {
      vendorData: null,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchVendorData();
  },
  methods: {
    fetchVendorData() {
      const streetfoodApiUrl = `${API_BASE_URL}/streetfood`;

      axios
        .get(streetfoodApiUrl)
        .then((response) => {
          this.vendorData = response.data;
          console.log(this.vendorData);

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
</style>
