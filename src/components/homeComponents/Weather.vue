<template>
  <div v-if="isLoading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="weather-container">
      <h2 v-if="weatherData && weatherData.city">
        City: {{ weatherData.city.name }}
      </h2>
      <p v-if="formattedDate">Date: {{ formattedDate }}</p>
      <div
        v-if="weatherData && weatherData.list && weatherData.list.length > 0"
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Weather",
  data() {
    return {
      weatherData: null,
      formattedDate: null,
      weatherIconUrl: "",
      isLoading: true,
    };
  },
  mounted() {
    this.fetchWeatherData();
  },
  methods: {
    fetchWeatherData() {
      const weatherApiKey = "3044316f6126db93462603440b6cd43c";
      const units = "imperial";
      const lang = "en";
      const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=${weatherApiKey}&units=${units}&lang=${lang}`;

      axios
        .get(weatherApiURL)
        .then((response) => {
          this.weatherData = response.data;
          console.log("weatherData: ", this.weatherData);

          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          this.formattedDate = today.toLocaleDateString();

          const weatherIconCode = this.weatherData.list[0].weather[0].icon;
          this.weatherIconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.weather-container {
  padding: 15px;
  border: 2px solid black;
  border-radius: 10px;
  margin: 10px;

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
</style>
