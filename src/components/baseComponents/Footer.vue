<template>
  <div class="footer-container">
    <span class="icon is-left">
      <a href="https://github.com/ekirbs" target="_blank" rel="noreferrer" class="footer-link">
        <font-awesome-icon :icon="['fab', 'github']" class="footer-icon" />
        <span className="footer-text">GitHub</span>
      </a>
    </span>
    <span class="icon is-left">
      <a href="https://www.linkedin.com/in/eric-kirberger/" target="_blank" rel="noreferrer" class="footer-link">
        <font-awesome-icon :icon="['fab', 'linkedin']" class="footer-icon" />
        <span className="footer-text">LinkedIn</span>
      </a>
    </span>
    <span class="icon is-left">
      <a href="https://www.instagram.com/clearlyimarobot83/" target="_blank" rel="noreferrer" class="footer-link">
        <font-awesome-icon :icon="['fab', 'instagram']" class="footer-icon" />
        <span className="footer-text">Instagram</span>
      </a>
    </span>
    <div class="links">
      <a href="../../../CODE_OF_CONDUCT.md">Terms and Conditions</a>
      <a href="../../../README.md">README</a>
      <a href="#">Donate</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.footer-container {
  min-height: 12vh;
  background-color: burlywood;
  padding: 10px;
  border-top: 2px solid black;

  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;
}

.footer-icon {
  height: 50px;
  width: 50px;
}

.links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid black;
  padding: 5px;
}
</style>
