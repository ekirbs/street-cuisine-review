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
  background-color: var(--primeGreen);
  padding: 10px;
  border-top: 10px solid var(--primeSlate);

  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;
}

.footer-link {
  color: var(--primeOffWhite);
  transition: transform 0.2s;
}

.footer-link:hover {
  color: var(--primeSlate);
  transform: scale(1.1);
}

.footer-icon {
  height: 50px;
  width: 50px;
}

.links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--primeSlate);
  padding: 5px 5px 5px 15px;
}

.links a {
  color: var(--primeOffWhite);
  transition: transform 0.2s;
}

.links a:hover {
  color: var(--primeSlate);
  transform: scale(1.1);
}
</style>
