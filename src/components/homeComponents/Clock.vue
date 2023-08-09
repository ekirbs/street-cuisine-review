<template>
  <h1 class="clock-time">Current Time: {{ currentTime }}</h1>
</template>

<script>
  export default {
    name: "Clock",
    data() {
      return {
        currentTime: '',
        intervalId: null,
      }
    },
    methods: {
      setCurrentTime() {
        const date = new Date();
        const formattedTime = date.toLocaleTimeString('en-US');
        this.currentTime = formattedTime;
      }
    },
    created() {
      this.setCurrentTime();
      this.intervalId = setInterval(() => {
        this.setCurrentTime();
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
    },
  };
</script>

<style scoped>
.clock-time {
  background-color: var(--primeOffWhite);
  padding: 10px;
  border-radius: 10px;
}
</style>