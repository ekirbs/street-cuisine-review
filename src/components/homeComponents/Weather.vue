<template>
  <h1 class="weather-header">Weather Report</h1>
  <div v-if="isLoading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
    <p>Loading...</p>
  </div>
  <div v-else>
    <div
      class="weather-container" v-if="weatherData">
      <h3>Today's Forecast</h3>
      <h2 v-if="weatherData.city.name">
        City: {{ weatherData.city.name }}
      </h2>
      <p v-if="formattedDate">Date: {{ formattedDate }}</p>
      <div
        v-if="
          weatherData.list &&
          weatherData.list.length > 0
        "
        class="weather-info-section"
      >
        <img :src="weatherIconUrl" alt="Weather Icon" class="weather-icon" />
        <p>Temperature: {{ weatherData.list[0].main.temp }}</p>
        <p>Humidity: {{ weatherData.list[0].main.humidity }}</p>
        <p>Wind Speed: {{ weatherData.list[0].wind.speed }}</p>
      </div>
      <div v-else>
        <p>Sorry, there is no weather data for this location...</p>
      </div>
    </div>

    <div class="forecast-container">
      <h3>5-Day Forecast</h3>
      <div
        v-for="(day, index) in forecastDays"
        :key="index"
        class="forecast-day card"
      >
        <h4>{{ getFormattedDate(index + 1) }}</h4>
        <img
          :src="getWeatherIconUrl(day.weather[0].icon)"
          alt="Weather Icon"
          class="forecast-icon"
        />
        <p>Temperature: {{ day.main.temp }}</p>
        <p>Humidity: {{ day.main.humidity }}</p>
        <p>Wind Speed: {{ day.wind.speed }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

// vuex store
const store = useStore();
// const city = ref(store.state.currentUser.city);
const city = computed(() => store.state.currentUser.city);
console.log('city:', city.value);

const weatherData = ref(null);
const formattedDate = ref(null);
const weatherIconUrl = ref('');
const isLoading = ref(true);

const forecastDays = computed(() => {
  if (weatherData.value && weatherData.value.list) {
    return weatherData.value.list.slice(1, 6);
  }
  return [];
});

const fetchWeatherData = () => {
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const units = 'imperial';
  const lang = 'en';
  const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${weatherApiKey}&units=${units}&lang=${lang}`;

  axios
    .get(weatherApiURL)
    .then((response) => {
      weatherData.value = response.data;
      console.log('weatherData: ', weatherData.value);

      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      formattedDate.value = today.toLocaleDateString();
      console.log("formatted date:", formattedDate.value);

      const weatherIconCode = weatherData.value.list[0].weather[0].icon;
      weatherIconUrl.value = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

      isLoading.value = false;
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      weatherData.value = null;
      isLoading.value = false;
    });
};

const getFormattedDate = (index) => {
  const today = new Date();
  const forecastDate = new Date(today.getTime() + index * 24 * 60 * 60 * 1000);
  return forecastDate.toLocaleDateString();
};

const getWeatherIconUrl = (iconCode) => {
  return `http://openweathermap.org/img/w/${iconCode}.png`;
};

watch(weatherData, (newData) => {
  console.log('weatherData updated:', newData);
});

watch(city, (newCity) => {
  fetchWeatherData(newCity);
});

// fetchWeatherData();
// onMounted(fetchWeatherData);
onMounted(() => {
  fetchWeatherData(city.value);
});
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.weather-header {
  text-decoration: underline;
}

.weather-container {
  padding: 15px;
  border: 2px solid black;
  border-radius: 10px;
  margin: 10px;
  background-color: azure;
  box-shadow: 1px 1px 2px black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.weather-info-section {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.forecast-container {
  display: flex;
}

.forecast-day {
  border: 1px solid black;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  background-color: azure;
  box-shadow: 1px 1px 2px black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.weather-container,
.forecast-day {
  background-image: url("@/assets/images/sky-background.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
