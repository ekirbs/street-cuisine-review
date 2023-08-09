<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item brand-container">
        <div class="brand-words-container">
          <h1 class="brand-name">Street Cuisine Review</h1>
          <p class="brand-quote">
            Your one-stop shop for fine dining on the streets.
          </p>
        </div>
        <div class="brand-img-container">
          <img
            src="../../assets/images/logo.png"
            class="logo-img"
            alt="Street Cuisine Review logo."
          />
        </div>
      </RouterLink>

      <!-- <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarContainer"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a> -->
      <div
        class="navbar-burger"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div
      id="navbarContainer"
      class="navbar-menu"
      :class="{ 'is-active': showNav }"
    >
      <div class="navbar-start" v-if="isLoggedIn">
        <!-- <RouterLink @click.native="closeDropdown" to="/" class="navbar-item">Home</RouterLink> -->

        <RouterLink to="/profile" class="navbar-item"> Profile </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <RouterLink to="/posts" class="navbar-item"> Posts </RouterLink>
            <!-- <RouterLink to="/feed" class="navbar-item"> Feed </RouterLink> -->
            <RouterLink to="/vendors" class="navbar-item"> Vendors </RouterLink>
            <a class="navbar-item"> About </a>
            <!-- <a class="navbar-item"> Contact </a> -->
            <hr class="navbar-divider" />
            <RouterLink to="/test" class="navbar-item">Test</RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div class="not-logged-in-buttons" v-if="!isLoggedIn">
              <RouterLink
                to="/signin"
                class="button is-primary"
                v-if="!isLoggedIn"
              >
                <strong>Sign In</strong>
              </RouterLink>
              <RouterLink
                to="/register"
                class="button is-light"
                v-if="!isLoggedIn"
              >
                <strong>Register</strong>
              </RouterLink>
            </div>
            <div class="logged-in-buttons" v-else>
              <a
                class="button is-light"
                @click="handleSignOut"
                v-if="isLoggedIn"
                >Sign Out</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const auth = getAuth();

const store = useStore();
const isLoggedIn = computed(() => store.state.isLoggedIn);

const showNav = ref(false);

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};

onMounted(() => {
  const user = auth.currentUser;
  if (user) {
    store.commit('setLoggedIn', true);
  } else {
    store.commit('setLoggedIn', false);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit('setLoggedIn', true);
  } else {
    store.commit('setLoggedIn', false);
  }
});

// onMounted(() => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       store.commit('setLoggedIn', true)
//     } else {
//       store.commit('setLoggedIn', false)
//     }
//   });
// });

watch(
  () => store.state.isLoggedIn,
  (newVal) => {
    console.log('log status:', newVal);
  }
);
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.navbar {
  padding: 5px 10px;
  background-color: var(--primeGreen) !important;
  border-bottom: 10px solid var(--primeSlate);
}

.navbar-brand {
  margin-right: 10px;
}

.brand-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.brand-words-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: var(--primeOffWhite);
}

.brand-name {
  font-size: 35px;
  border-bottom: 2px solid var(--primeSlate);
}

.brand-quote {
  font-size: 15px;
}

.logo-img {
  min-height: 75px;
  min-width: 75px;
  margin: 0 5px;
}

a.navbar-link::after {
  border-color: var(--primeSlate) !important;
}
</style>
