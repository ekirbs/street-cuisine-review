<template>
  <div class="profile-container">
    <Map />
  </div>
</template>

<script>
import { Map } from '../components/homeComponents'
export default {
  name: 'Profile',
  components: {
    Map
  }
}
</script>

<style scoped>
.profile-container {
  height: 100vh;
  width: 80vw;
  background-color: blanchedalmond;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.line-through {
  text-decoration: line-through;
  /* make apps w. danny, min22 */
}
</style>