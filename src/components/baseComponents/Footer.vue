<template>
  <div class="footer-container">
    <span class="icon is-left">
      <a href="https://github.com/ekirbs" target="_blank" rel="noreferrer" class="footer-link">
        <font-awesome-icon :icon="['fab', 'github']" />
        <span className="footer-text">GitHub</span>
      </a>
    </span>
    <span class="icon is-left">
      <a href="https://www.linkedin.com/in/eric-kirberger/" target="_blank" rel="noreferrer" class="footer-link">
        <font-awesome-icon :icon="['fab', 'linkedin']" />
        <span className="footer-text">LinkedIn</span>
      </a>
    </span>
    <span class="icon is-left">
      <a href="https://www.instagram.com/clearlyimarobot83/" target="_blank" rel="noreferrer" class="footer-link">
        <font-awesome-icon :icon="['fab', 'instagram']" />
        <span className="footer-text">Instagram</span>
      </a>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.footer-container {
  min-height: 10vh;
  background-color: burlywood;

  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;
}
</style>
