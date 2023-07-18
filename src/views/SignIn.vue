<template>
  <div class="signup-container">
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
    <p v-if="errMsg">{{ errMsg }}</p>

    <button class="button" @click="signIn">Sign In</button>
    <button class="button" @click="signInWithGoogle">
      Sign In With Google
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

const signIn = () => {
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();

  signInWithEmailAndPassword(getAuth(), trimmedEmail, trimmedPassword)
    .then((data) => {
      console.log("Successfully signed in!");
      // console.log(auth.currentUser);
      router.push("/profile");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
      // alert(error.message)
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/profile");
    })
    .catch((error) => {});
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";

.signup-container {
  height: 80vh;
  width: 75vw;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: whitesmoke;
  border-radius: 10px;
}

.input {
  width: 300px;
}

.button {
  margin: 5px;
}
</style>
