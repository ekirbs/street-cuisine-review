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

    <button @click="register">Submit</button>
    <button @click="signInWithGoogle">Sign In With Google</button>

    <!-- <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      // console.log(auth.currentUser);
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
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
</style>
