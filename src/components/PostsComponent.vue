<template>
  <p v-if="!hasPosts">Loading...</p>
  <v-container
    fluid
    class="d-flex flex-column"
    style="gap: 2rem"
    v-else-if="hasPosts && !noPosts"
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

<script lang="ts">
import PostComponent from "@/components/PostComponent.vue";
import { computed } from "vue";
import { IPostProps } from "@/interfaces";

export default {
  name: "PostsComponent",
  components: { PostComponent },
  props: {
    isOnDashboard: Boolean,
    posts: Array,
  },
  setup(props: {
    isOnDashboard: Pick<IPostProps, "isOnDashboard">;
    posts: Pick<IPostProps, "post">[];
  }) {
    const noPosts = computed(() => props.posts?.length === 0);
    const hasPosts = computed(() => !!props.posts);

    return {
      noPosts,
      hasPosts,
    };
  },
};
</script>

<style scoped lang="scss"></style>
