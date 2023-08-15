<template>
  <div class="select">
    <select v-model="selectedCity" @change="handleCityChange">
    <!-- <select v-model="selectedCity" @change="handleCityChange"> -->
      <option v-for="city in cities" :key="city" :value="city">
        {{ capitalizeCity(city) }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

// // trial code
// import { ref, watch, defineProps } from 'vue';

// const props = defineProps({
//   currentUser: Object,
// })

// const selectedCity = ref(props.currentUser.city);
// const cities = ['boston', 'toronto'];

// watch(selectedCity, (newValue) => {
//   emit('update:currentUser', { ...props.currentUser, city: newValue });
// });

// vuex store & refs
const store = useStore();
const selectedCity = ref(store.state.currentUser.city);
const cities = ['boston', 'toronto'];

watch(selectedCity, (newValue) => {
  store.commit('setCity', newValue);
});

const capitalizeCity = (city) => {
  if (!city) return '';
  return city.replace(/\b\w/g, (char) => char.toUpperCase());
};

const handleCityChange = () => {
  store.commit('setCity', selectedCity.value);
};
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.select {
  margin-bottom: 20px;
}
</style>
