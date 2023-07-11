<template>
  <div class="edit-post-container">
    <h2>this is the edit post page</h2>
    <form @submit.prevent="editPost">
      <div class="edit-post-form">
        <div class="field">
          <label
          class="label has-text-centered"
            for="newTitle"
          >
            New Title:
          </label>
          <div class="control">
            <input
              v-model="newPostTitle"
              class="input"
              type="text"
              placeholder="new title of post"
              name="newTitle"
            >
          </div>
        </div>

        <div class="field">
          <label
            class="label has-text-centered"
            for="newContent"
          >
            New Content:
          </label>
          <div class="control">
            <textarea
              v-model="newPostContent"
              class="textarea"
              placeholder="new text area"
              name="newContent"
              id="newContent"
            ></textarea>
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered mb-5">
          <div class="control">
            <button
              :disabled="!newPostTitle || !newPostContent"
              class="button is-link"
            >
              Confirm Edit
            </button>
          </div>
          <!-- <div class="control">
              <button
              :disabled="!newPostTitle && !newPostContent"
                class="button is-link is-light"
              >
                Cancel
              </button>
            </div> -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.edit-post-container {
  width: 85vw;
  height: 80vh;
  background-color: darkkhaki;
  margin: 75px auto;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.edit-post-form {
  width: 60vw;
}

</style>