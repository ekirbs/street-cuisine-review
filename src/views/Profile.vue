<template>
  <div class="profile-container">
    <h1>Profile Page</h1>
    <h3>Display Name: {{ userData.displayName }}</h3>
    <button class="button is-success is-large" @click="showModal = true">
      Change Display Name
    </button>
    <p>Email: {{ userData.email }}</p>
    <p>Current City: {{ userData.city }}</p>
    <p>Registered On: {{ formattedRegistrationDate }}</p>
    
    <UserPosts />

    <div v-if="showModal" class="modal is-active">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button
              class="delete"
              aria-label="close"
              @click="showModal = false"
            ></button>
          </header>
          <section class="modal-card-body">
            This is where we'll change it.
            <input
              type="text"
              class="input is-primary"
              placeholder="New Display Name"
              v-model="newDisplayName"
            />
            <p v-if="showErrorMessage" class="help is-danger">Please enter a new display name.</p>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="saveChanges">
              Save changes
            </button>
            <button class="button" @click="showModal = false">Cancel</button>
          </footer>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="showModal = false"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { UserPosts } from '@/components/profileComponents';

import { onMounted, ref, reactive, computed } from 'vue';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';

// reactive
const userData = reactive({
  displayName: null,
  email: null,
  registrationDate: null,
});

// refs
const showModal = ref(false);
const showErrorMessage = ref(false);
const newDisplayName = ref('');

let currentUser = null;

onMounted(() => {
  const currentUser = getAuth().currentUser;
  if (currentUser) {
    userData.displayName = currentUser.displayName;
    userData.email = currentUser.email;
    userData.registrationDate = currentUser.metadata.createdAt;
    console.log('current user:', currentUser);
  }
});

onAuthStateChanged(getAuth(), (updatedUser) => {
  if (updatedUser) {
    userData.displayName = updatedUser.displayName;
    userData.email = updatedUser.email;
    userData.registrationDate = updatedUser.metadata.createdAt;
    currentUser = updatedUser;
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

const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('is-active');
  }
};

const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('is-active');
  }
};

const closeAllModals = () => {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal.id);
  });
};

document.querySelectorAll('.js-modal-trigger').forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);

  $trigger.addEventListener('click', () => {
    openModal($target.id);
  });
});

document
  .querySelectorAll(
    '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
  )
  .forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target.id);
    });
  });

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    closeAllModals();
  }
});

const saveChanges = async () => {
  const updatedDisplayName = newDisplayName.value.trim();
  if (updatedDisplayName) {
    try {
      await updateProfile(currentUser, {
        displayName: updatedDisplayName,
      });

      userData.displayName = updatedDisplayName;
      showModal.value = false;
      newDisplayName.value = '';
    } catch (error) {
      console.error('Error updating display name:', error);
    }
  } else {
    showErrorMessage.value = true;
  }
};
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

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
