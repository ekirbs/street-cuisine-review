<template>
  <div class="profile-container">
    <h1 class="profile-title">Profile Page</h1>
    <div class="columns">
      <div class="column is-one-third card">
        <img src="../assets/images/blank-profile.webp" alt="blank profile" class="profile-img">
      </div>
      <div class="column card">
        <h3>Display Name: <span class="display-name">{{ userData.displayName }}</span></h3>
        <button class="change-name-button button is-success is-large" @click="showModal = true">
          Change Display Name
        </button>
        <p>Email: {{ userData.email }}</p>
        <p>Current City: {{ capitalizeCity(currentUser.city) }}</p>
        <p>Registered On: {{ formattedRegistrationDate }}</p>
      </div>
    </div>
    
    <UserPosts />

    <div v-if="showModal" class="modal is-active">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-content">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Change your name, <span class="modal-display-name">{{ userData.displayName }}</span> !</p>
            <button
              class="delete"
              aria-label="close"
              @click="showModal = false"
            ></button>
          </header>
          <section class="modal-card-body">
            This is where we'll change it. Enter a new name here.
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
import { useStore } from 'vuex';

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

// let currentUser = null;
const store = useStore();
let currentUser = store.state.currentUser;

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

const capitalizeCity = (city) => {
  if(!city) return '';
  return city.replace(/\b\w/g, (char) => char.toUpperCase());
};
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

/* BASIC STYLE */
.profile-container {
  min-height: 100vh;
  max-width: 80vw;
  background-color: blanchedalmond;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}
.line-through {
  text-decoration: line-through;
  /* make apps w. danny, min22 */
}

/* TITLE STYLE */
.profile-title {
  font-size: 24px; /* Increase the font size for the profile title */
  margin-bottom: 15px; /* Add some spacing below the title */
}

.columns {
  width: 100%;
}

.column {
  margin: 10px;
  border-radius: 10px;
}

/* PROFILE IMG STYLE */
.profile-img {
  border: 2px solid black;
  border-radius: 10px;
}

.display-name {
  font-size: 20px;
  text-decoration: underline;
}

/* CHANGE NAME BUTTON STYLE */
.change-name-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.change-name-button:hover {
  background-color: #45a049;
}

/* MODAL STYLE */
.modal-content {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-card-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.modal-display-name {
  font-size: 24px;
  text-decoration: underline;
}

.input.is-primary {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.help.is-danger {
  color: #e74c3c;
}

/* Style the user details */
h3, p {
  margin-bottom: 10px;
}

/* Add some margin below the user posts section */
#user-posts {
  margin-top: 20px;
}

</style>
