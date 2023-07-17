<template>
  <div class="single-post-container">
    <div class="card mb-5">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">
              <div class="single-post card mb-5" v-if="post">
                <div class="title">Title: {{ post.title }}</div>
                <div class="content">Content: {{ post.content }}</div>
              </div>
            </div>

            <div class="column is-5 has-text-right">
              <!-- <button class="button is-success">
                &check;
              </button> -->
              <button class="button is-light ml-2">&#9998;</button>
              <button class="button is-danger ml-2">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';

const router = useRouter();

// refs
const postId = ref(route.params.postId);
const post = ref(null);

// get post
onMounted(async () => {
  const postDocRef = doc(db, 'posts', postId.value);
  const postDocSnap = await getDoc(postDocRef);

  if (postDocSnap.exists()) {
    const postData = postDocSnap.data();
    post.value = {
      id:postId.value,
      title: postData.title,
      content: postData.content,
      linked: postData.liked,
    };
  } else {
    console.error('Post not found');
  };
});


</script>

<style scoped></style>
