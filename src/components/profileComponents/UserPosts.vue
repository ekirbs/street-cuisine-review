<template>
  <div class="user-post-container">
    <div class="title has-text-centered">
      <h2>My Posts</h2>
    </div>
    <h3 class="has-text-centered">Add a New Post</h3>

    <form>
      <div class="post-form">
        <!-- <main> -->
        <div class="field">
          <label class="label has-text-centered" for="title"> Title: </label>
          <div class="control">
            <input
              v-model="postTitle"
              class="input"
              type="text"
              placeholder="title of post"
              name="title"
            />
          </div>
        </div>

        <div class="field">
          <label class="label has-text-centered" for="content">
            Content:
          </label>
          <div class="control">
            <textarea
              v-model="postContent"
              class="textarea"
              placeholder="text area"
              name="content"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input v-model="termsAgreed" type="checkbox" />
              I agree to the <a href="../../../CODE_OF_CONDUCT.md" class="checkbox-link">terms and conditions</a>
            </label>
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered mb-5">
          <div class="control">
            <button
              :disabled="!postTitle || !postContent || !termsAgreed"
              class="button is-link"
              @click.prevent="addPost"
            >
              Post
            </button>
          </div>
          <div class="control">
            <button
              :disabled="!postTitle && !postContent"
              class="button is-link is-light"
              @click="cancel"
            >
              Cancel
            </button>
          </div>
        </div>
        <!-- </main> -->
      </div>
    </form>

    <div v-if="userPosts.length">
      <h3>Here are Your Posts:</h3>
      <div
        v-for="post in userPosts"
        :key="post.id"
        class="card mb-5"
        :class="{ 'has-background-success-light': post.liked }"
      >
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile is-vcentered">
              <div class="column">
                <div
                  class="title"
                  :class="{ 'has-text-success ': post.liked }"
                >
                  {{ post.title }}
                </div>
                <div
                  class="content"
                  :class="{ 'has-text-success': post.liked }"
                >
                  {{ post.content }}
                </div>
                <div
                  class="creator"
                  :class="{ 'has-text-success': post.liked }"
                >
                  Author: {{ post.creatorDisplayName }}
                </div>
              </div>

              <div class="column is-5 has-text-right">
                <button
                  @click="toggleLiked(post.id)"
                  class="button mr-2"
                  :class="post.liked ? 'is-success' : 'is-light'"
                >
                  &check;
                </button>
                <RouterLink
                  :to="{
                    name: 'editPost',
                    params: { postId: post.id },
                  }"
                  class="button is-light"
                >
                  &#9998;
                </RouterLink>
                <button
                  @click="deletePost(post.id)"
                  class="button is-danger ml-2"
                >
                  &cross;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-post-message">
      <p>No posts found for the current user.</p>
    </div>
  </div>
</template>

<script setup>
// imports
import { ref, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import {
  collection,
  query,
  onSnapshot,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { RouterLink } from 'vue-router';

// firebase refs
// const postsCollectionRef = collection(db, 'posts');
// const userPostsCollectionQuery = query(
//   postsCollectionRef,
//   where('creatorUid', '==', currentUser.uid),
//   orderBy('date', 'desc'),
//   limit(10)
// );

// refs
const userPosts = ref([]);
const postTitle = ref('');
const postContent = ref('');
const termsAgreed = ref('');

// get posts
onMounted(() => {
  const currentUser = getAuth().currentUser;
  if (currentUser) {
    const postsCollectionRef = collection(db, 'posts');
    const userPostsCollectionQuery = query(
      postsCollectionRef,
      where('creatorUid', '==', currentUser.uid),
      orderBy('date', 'desc'),
      limit(10)
    );

    onSnapshot(userPostsCollectionQuery, (querySnapshot) => {
      const fbUserPosts = [];
      querySnapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          liked: doc.data().liked,
          creatorDisplayName: doc.data().creatorDisplayName,
        };
        fbUserPosts.push(post)
      });
      userPosts.value = fbUserPosts;
    })
  }
});

// add post
const addPost = () => {
  const currentUser = getAuth().currentUser;
  console.log("current user", currentUser);
  if (currentUser) {
    addDoc(postsCollectionRef, {
      title: postTitle.value,
      content: postContent.value,
      agreed: termsAgreed.value,
      liked: false,
      date: Date.now(),
      creatorDisplayName: currentUser.displayName,
      creatorUid: currentUser.uid,
    });
    postTitle.value = '';
    postContent.value = '';
    termsAgreed.value = false;
  }
};

// cancel post
const cancel = () => {
  postTitle.value = '';
  postContent.value = '';
  termsAgreed.value = false;
};

// delete post
const deletePost = (id) => {
  deleteDoc(doc(postsCollectionRef, id));
};

// like post
const toggleLiked = (id) => {
  const index = posts.value.findIndex((post) => post.id === id);

  updateDoc(doc(postsCollectionRef, id), {
    liked: !posts.value[index].liked,
  });
};

// add comment

// edit comment

// delete comment

// like comment
</script>

<style scoped>
@import 'bulma/css/bulma.min.css';

.user-post-container {
  max-width: 75vw;
  padding: 20px;
  margin: 10px auto;

  width: 75vw;
  background-color: var(--primeSlate);
  border-radius: 10px;
}

.title h2 {
  color: var(--primeGreen);
  text-decoration: underline;
}

.user-post-container h3 {
  color: var(--primeGreen);
}

.label {
  color: var(--primeOffWhite);
}

.checkbox {
  color: var(--primeOffWhite)
}

/* shouldn't need this...fix link... */
.checkbox:hover {
  color: var(--primeOffWhite)
}

.no-post-message {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primeOffWhite);
}
</style>
