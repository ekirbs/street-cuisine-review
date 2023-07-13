<template>
  <div class="edit-post-container">
    <h2>this is the edit post page</h2>

    <div class="single-post card mb-5" v-if="post">
      <h3>Title: {{ post.title }}</h3>
      <p>Content: {{ post.content }}</p>
    </div>

    <form>
      <div class="edit-post-form">
        <div class="field">
          <label class="label has-text-centered" for="newTitle">
            New Title:
          </label>
          <div class="control">
            <input
              v-model="newPostTitle"
              class="input"
              type="text"
              placeholder="new title of post"
              name="newTitle"
            />
          </div>
        </div>

        <div class="field">
          <label class="label has-text-centered" for="newContent">
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

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input v-model="termsAgreed" type="checkbox" />
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered mb-5">
          <div class="control">
            <button
              :disabled="!newPostTitle || !newPostContent || !termsAgreed"
              class="button is-link"
              @click.prevent="editPost"
            >
              Confirm Edit
            </button>
          </div>
          <div class="control">
            <button
              :disabled="!newPostTitle && !newPostContent"
              class="button is-link is-light"
              @click.prevent="cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '@/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const route = useRoute();
const router = useRouter();

// refs
const postId = ref(route.params.postId);
const post = ref(null);
const newPostTitle = ref('');
const newPostContent = ref('');
const termsAgreed = ref(false);

// get post
onMounted(async () => {
  const postDocRef = doc(db, 'posts', postId.value);
  const postDocSnap = await getDoc(postDocRef);

  if (postDocSnap.exists()) {
    const postData = postDocSnap.data();
    post.value = {
      id: postId.value,
      title: postData.title,
      content: postData.content,
      liked: postData.liked,
    };
    newPostTitle.value = post.value.title;
    newPostContent.value = post.value.content;
  } else {
    console.error('Post not found');
    router.push('/posts');
  }
});

// edit post
const editPost = async () => {
  const postDocRef = doc(db, 'posts', post.value.id);

  await updateDoc(postDocRef, {
    title: newPostTitle.value,
    content: newPostContent.value,
  });

  router.push('/posts');
};

//cancel edit post
const cancel = () => {
  newPostTitle.value = '';
  newPostContent.value = '';
  termsAgreed.value = false;
};
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.single-post {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 10px;
}

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
