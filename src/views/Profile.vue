<template>
  <div class="profile-container">
    <h1>Profile Page</h1>
    <h3>Display Name: {{ userData.displayName }}</h3>
    <p>Email: {{ userData.email }}</p>
    <p>Registered On: {{ formattedRegistrationDate }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// reactive
const userData = reactive({
  displayName: null,
  email: null,
  registrationDate: null,
});

onMounted(() => {
  const currentUser = getAuth().currentUser;
  if (currentUser) {
    console.log('current user:', currentUser);
    userData.displayName = currentUser.displayName;
    userData.email = currentUser.email;
    userData.registrationDate = currentUser.metadata.createdAt;
  }
});

onAuthStateChanged(getAuth(), (updatedUser) => {
  if (updatedUser) {
    userData.displayName = updatedUser.displayName;
    userData.email = updatedUser.email;
    userData.registrationDate = updatedUser.metadata.createdAt;
  }
});

const formattedRegistrationDate = computed(() => {
  if (userData.registrationDate) {
    const timestamp = parseInt(userData.registrationDate);
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  return '';
});
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  width: 80vw;
  background-color: blanchedalmond;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  padding: 10px;
}
.line-through {
  text-decoration: line-through;
  /* make apps w. danny, min22 */
}
</style>
