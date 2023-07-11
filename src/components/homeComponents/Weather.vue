<template>
  <div>
    <p>this is where the weather forecast will be</p>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'Weather',
  data() {
    return {
      weatherData: null
    };
  },
  mounted() {
    this.fetchWeatherData();
  },
  methods: {
    fetchWeatherData() {
      const weatherApiKey = '3044316f6126db93462603440b6cd43c';
      const units = "imperial";
      const lang = "en";
      const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=${weatherApiKey}&units=${units}&lang=${lang}`;
      // axios.get(weatherApiURL)
      fetch(weatherApiURL)
        .then(response => response.json())
        .then(data => {
          this.weatherData = data;
        })
        .catch(error => {
          console.error('Error fetching weather data:', error)
        })
    }
  }
}

</script>

<style scoped>

</style>