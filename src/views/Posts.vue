<template>
  <div class="post-container">
    <div class="title has-text-centered">
      <h2>Posts</h2>
    </div>
    <h3 class="has-text-centered">working on the post component</h3>

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
              I agree to the <a href="#">terms and conditions</a>
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

    <div v-if="posts.length">
      <div
        v-for="post in posts"
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
    <div v-else>
      <p>there's nothing here</p>
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
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { RouterLink } from 'vue-router';

// firebase refs
const postsCollectionRef = collection(db, 'posts');
const postsCollectionQuery = query(
  postsCollectionRef,
  orderBy('date', 'desc'),
  limit(10)
);

// refs
const posts = ref([]);
const postTitle = ref('');
const postContent = ref('');
const termsAgreed = ref('');

// get posts
onMounted(() => {
  // const q = query(postsCollectionRef, where('author', '===', ''));
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  onSnapshot(postsCollectionQuery, (querySnapshot) => {
    const fbPosts = [];
    querySnapshot.forEach((doc) => {
      const post = {
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        liked: doc.data().liked,
        creatorDisplayName: doc.data().creatorDisplayName,
      };
      fbPosts.push(post);
    });
    posts.value = fbPosts;
  });
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

<style>
@import 'bulma/css/bulma.min.css';

.post-container {
  max-width: 75vw;
  padding: 20px;
  margin: 10px auto;

  width: 75vw;
  background-color: bisque;
  border-radius: 10px;
}
</style>
