<template>
  <div class="post-container">
    <div class="title has-text-centered">
      <h2>Posts</h2>
    </div>
    <h3 class="has-text-centered">working on the post component</h3>

    <form @submit.prevent="addPost">
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

        <!-- <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" />
                I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>
          </div> -->

        <!-- <div class="field">
            <div class="control">
              <label class="radio">
                <input type="radio" name="question" />
                Yes
              </label>
              <label class="radio">
                <input type="radio" name="question" />
                No
              </label>
            </div>
          </div> -->

        <div class="field is-grouped is-grouped-centered mb-5">
          <div class="control">
            <button
              :disabled="!postTitle || !postContent"
              class="button is-link"
            >
              Post
            </button>
          </div>
          <!-- <div class="control">
              <button
              :disabled="!postTitle && !postContent"
                class="button is-link is-light"
              >
                Cancel
              </button>
            </div> -->
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
        <!-- <router-link :to="{ name: 'singlePost', params: { postId: post.id }, props: { post: post } }"> -->
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile is-vcentered">
              <div class="column">
                <div class="title" :class="{ 'has-text-success ': post.liked }">
                  {{ post.title }}
                </div>
                <div
                  class="content"
                  :class="{ 'has-text-success': post.liked }"
                >
                  {{ post.content }}
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
                <RouterLink to="/editPost" class="button is-light">
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
        <!-- </router-link> -->
      </div>
    </div>
    <div v-else>
      <p>there's nothing here</p>
    </div>
  </div>
</template>

<script setup>
// import
import { ref, onMounted } from "vue";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";

import { RouterLink } from "vue-router";

// firebase refs
const postsCollectionRef = collection(db, "posts");
const postsCollectionQuery = query(
  postsCollectionRef,
  orderBy("date", "desc"),
  limit(10),
);

// posts
const posts = ref([
  // {
  //   id: 'id1',
  //   title: 'Khabib\'s Kabobs',
  //   content: 'Khabib really knows how to cook!',
  //   liked: false
  // },
  // {
  //   id: 'id2',
  //   title: 'blech',
  //   content: 'I hate street food, but I love this site.',
  //   liked: true
  // }
]);

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
      };
      fbPosts.push(post);
    });
    posts.value = fbPosts;
  });
});

// add post
const postTitle = ref("");
const postContent = ref("");

const addPost = () => {
  addDoc(postsCollectionRef, {
    title: postTitle.value,
    content: postContent.value,
    liked: false,
    date: Date.now(),
  });
  postTitle.value = "";
  postContent.value = "";
};

// // edit post
// const editPost = id => {
//   console.log('edit post:', id)
// }

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
@import "bulma/css/bulma.min.css";

.post-container {
  max-width: 75vw;
  padding: 20px;
  margin: 10px auto;

  width: 75vw;
  background-color: bisque;
  border-radius: 10px;
}

/* @media (min-width: 1024px) {
  .post-form {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
} */
</style>
