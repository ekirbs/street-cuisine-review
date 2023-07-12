<template>
  <div class="single-post-container">
    <div class="card mb-5">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">
              <div class="title">Title: {{ post.title }}</div>
              <div class="content">Content: {{ post.content }}</div>
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

<script>
export default {};
</script>

<style scoped></style>
