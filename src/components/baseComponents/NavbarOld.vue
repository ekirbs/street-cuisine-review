<!-- <template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="brand-container">
        <RouterLink to="/" class="navbar-item">
          <h1>Street Cuisine Review</h1>
          <img
            src="../../assets/images/logo.png"
            class="logo-img"
            alt="Street Cuisine Review logo."
          />
        </RouterLink>
        <p>Your one-stop shop for fine dining on the streets.</p>
      </div>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start" v-if="isLoggedIn">
        <RouterLink to="/" class="navbar-item"> Home </RouterLink>

        <RouterLink to="/profile" class="navbar-item"> Profile </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <RouterLink to="/posts" class="navbar-item"> Posts </RouterLink>
            <RouterLink to="/feed" class="navbar-item"> Feed </RouterLink>
            <a class="navbar-item"> About </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div class="not-logged-in-buttons" v-if="!isLoggedIn">
              <RouterLink to="/signin" class="button is-primary" v-if="!isLoggedIn">
                <strong>Sign In</strong>
              </RouterLink>
              <RouterLink to="/register" class="button is-light" v-if="!isLoggedIn">
                <strong>Register</strong>
              </RouterLink>
            </div>
            <div class="logged-in-buttons" v-else>
              <a class="button is-light" @click="handleSignOut" v-if="isLoggedIn">Sign Out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from 'vuex'

const store = useStore();
const router = useRouter();
const auth = getAuth();
// const isLoggedIn = ref(false);
const isLoggedIn = computed(() => store.state.isLoggedIn);


onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.commit('setLoggedIn', true)
      // isLoggedIn.value = true;
    } else {
      store.commit('setLoggedIn', false)
      // isLoggedIn.value = false;
    }
  });
});

// watch(() => store.state.isLoggedIn, (newVal) => {
//   console.log("log status:", newVal);
// });

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.navbar {
  padding: 5px 10px;
}

.navbar-brand {
  margin-right: 10px;
}

.brand-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style> -->
