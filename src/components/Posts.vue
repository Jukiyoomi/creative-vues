<template>
  <p v-if="posts === null">Loading...</p>
  <v-container
    fluid
    class="d-flex flex-column"
    style="gap: 2rem"
    v-else-if="posts.length > 0"
  >
    <post-component
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :is-on-dashboard="isOnDashboard"
    ></post-component>
  </v-container>
  <p v-else>No posts yet. You can make one ! :)</p>
</template>

<script>
import PostComponent from "@/components/Post.vue";

export default {
  name: "PostsComponent",
  components: { PostComponent },
  props: {
    isOnDashboard: Boolean,
    posts: Array,
  },
};
</script>

<style scoped lang="scss"></style>
