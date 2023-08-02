<template>
  <div class="map-container">
    <div v-if="isLoading" class="loading-container">
      <font-awesome-icon :icon="['fas', 'spinner']" spin />
      <p>Loading...</p>
    </div>
    <div v-else>
      <GMapMap
        :center="center"
        :zoom="zoomLevel"
        map-type-id="terrain"
        :options="mapOptions"
        class="map"
      >
        <GMapMarker
          :key="index"
          v-for="(vendor, index) in vendorsData"
          :position="vendor.position"
          :title="vendor.name"
          :icon="getVendorIcon(vendor)"
          :clickable="true"
          @click="center = vendor.position"
        >
          <GMapInfoWindow
            :opened="true"
            :options="infoWindowOptions(vendor)"
          >
            <div>
              <InfoWindow :vendor="vendor" />
            </div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { API_BASE_URL } from '../../../config';
import axios from 'axios';

import { InfoWindow } from '../mapComponents';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

// vuex store
const store = useStore();
const selectedCity = ref(store.state.currentUser.city);

// refs
const center = ref({ lat: 42.3601, lng: -71.0589 });
const zoomLevel = ref(10);
const vendorsData = ref([]);
const isLoading = ref(true);
const error = ref(null);

const vendorLogoIcon = ref({
  url: '',
  scaledSize: { width: 50, height: 50 },
});

const defaultIcon = ref({
  url: faTruck.icon[4],
  scaledSize: { width: 50, height: 50 },
});

const infoWindowOptions = (vendor) => ({
  maxWidth: 200,
  content: `
    <div>
      <h5>
        Name: ${vendor.name}
      </h5>
      <p>
        Description: ${vendor.description}
      </p>
    </div>
  `,
});

const fetchVendorsData = async () => {
  isLoading.value = true;
  try {
    const vendorsApiUrl = `${API_BASE_URL}/vendors/${selectedCity.value}`;
    console.log('Fetching vendors data for city:', selectedCity.value);
    const response = await axios.get(vendorsApiUrl);
    vendorsData.value = Object.values(response.data.vendors).map((vendor) => ({
      name: vendor.name,
      logo: vendor.images?.logo_small,
      position: {
        lat: Number(vendor.last.latitude),
        lng: Number(vendor.last.longitude),
      },
      description: vendor.description,
    }));
    console.log('vendorsData:', vendorsData.value);
    isLoading.value = false;
    error.value = null;
  } catch (error) {
    console.error('Error fetching vendor data:', error);
    isLoading.value = false;
    error.value = 'Error fetching vendor data.  Please try again later.';
  }
};

// fetch vendors data init
onMounted(fetchVendorsData);

const getVendorIcon = (vendor) => {
  if (vendor.logo && vendor.logo !== '' && isValidURL(vendor.logo)) {
    return { ...vendorLogoIcon.value, url: vendor.logo };
  } else {
    return { ...defaultIcon.value };
  }
};

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

watch(selectedCity, fetchVendorsData);

// update map center and zoom on data change
watch(vendorsData, () => {
  if (vendorsData.value.length > 0) {
    center.value = vendorsData.value[0].position;
    zoomLevel.value = 12;

    vendorLogoIcon.value.url = vendorsData.value[0].logo || '';
  } else {
    center.value = { lat: 42.3601, lng: -71.0589 };
    zoomLevel.value = 10;

    vendorLogoIcon.value.url = '';
  }
});

// const mapStyle = [
//   {
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#ebe3cd',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#523735',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#f5f1e6',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#c9b2a6',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.land_parcel',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#dcd2be',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.land_parcel',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#ae9e90',
//       },
//     ],
//   },
//   {
//     featureType: 'landscape.natural',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#dfd2ae',
//       },
//     ],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#dfd2ae',
//       },
//     ],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#93817c',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         color: '#a5b076',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#447530',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#f5f1e6',
//       },
//     ],
//   },
//   {
//     featureType: 'road.arterial',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#fdfcf8',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#f8c967',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#e9bc62',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway.controlled_access',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#e98d58',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway.controlled_access',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#db8555',
//       },
//     ],
//   },
//   {
//     featureType: 'road.local',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#806b63',
//       },
//     ],
//   },
//   {
//     featureType: 'transit.line',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#dfd2ae',
//       },
//     ],
//   },
//   {
//     featureType: 'transit.line',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#8f7d77',
//       },
//     ],
//   },
//   {
//     featureType: 'transit.line',
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#ebe3cd',
//       },
//     ],
//   },
//   {
//     featureType: 'transit.station',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#dfd2ae',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry.fill',
//     stylers: [
//       {
//         color: '#b9d3c2',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#92998d',
//       },
//     ],
//   },
// ];

const mapOptions = computed(() => ({
  center: center.value,
  zoom: zoomLevel.value,
  mapTypeId: 'terrain',

  // styles: mapStyle,
  maxZoom: 18,
}));
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.map-container {
  height: 86vw;
  width: 86vw;
  margin: 15px auto;
  border: 2px solid black;
}

.map {
  height: 85vw;
  width: 85vw;

  margin: 2px auto;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.error-message {
  color: red;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}
</style>
