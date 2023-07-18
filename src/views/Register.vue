<template>
  <div class="register-container">
    <h1>Create an Account</h1>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </span>
        <span class="icon is-small is-right">
          <font-awesome-icon :icon="['fas', 'check']" />
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'lock']" />
        </span>
      </p>
    </div>

    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Display Name"
          v-model="displayName"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'user']" />
        </span>
      </p>
    </div>

    <button @click="register">Register</button>
    <button @click="signInWithGoogle">Sign In With Google</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const displayName = ref('');

const router = useRouter();

const register = () => {
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();
  const trimmedDisplayName = displayName.value.trim();

  registerWithEmailAndPassword(trimmedEmail, trimmedPassword, trimmedDisplayName);

  // getAuth()
  //   .fetchSignInMethodsForEmail(trimmedEmail)
  //   .then((providers) => {
  //     if (providers.length > 0) {
  //       alert('Email is already registered');
  //     } else {
  //       registerWithEmailAndPassword(trimmedEmail, trimmedPassword, trimmedDisplayName);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error checking email:', error);
  //   });
};

const registerWithEmailAndPassword = (email, password, displayName) => {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: displayName,
      })
        .then(() => {
          console.log('Successfully registered!');
          router.push('/feed');
        })
        .catch((error) => {
          console.error('Error updating user profile:', error);
        });
    })
    .catch((error) => {
      console.error('Error registering with email and password:', error);
      alert(error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider);
};
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.register-container {
  width: 75vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 10px auto;
}
</style>

<!-- 
<template>
  <div class="register-container">
    <h1>Create an Account</h1>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" v-model="email" />
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </span>
        <span class="icon is-small is-right">
          <font-awesome-icon :icon="['fas', 'check']" />
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon :icon="['fas', 'lock']" />
        </span>
      </p>
    </div>

    <button @click="register">Register</button>
    <button @click="signInWithGoogle">Sign In With Google</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();

  getAuth()
    .fetchSignInMethodsForEmail(trimmedEmail)
    .then((providers) => {
      if (providers.length > 0) {
        alery("Email is already registered");
      } else {
        registerWithEmailAndPassword(trimmedEmail, trimmedPassword);
      }
    })
    .catch((error) => {
      console.error("Error checking email:", error);
    });
  };

const registerWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then((data) => {
      console.log("Successfully registered!");
      router.push("/feed");
    })
    .catch((error) => {
      console.error("Error registering with email and password:", error);
      alert(error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider);
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.register-container {
  width: 75vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 10px auto;
}
</style> -->
