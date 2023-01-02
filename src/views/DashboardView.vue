<template>
  <div class="d-flex align-center justify-space-between">
    <title-component :text="'Dashboard. Hello ' + username"></title-component>
    <button-component :on-click="logout">Logout</button-component>
  </div>
  <posts-component
    :posts="posts"
    :is-on-dashboard="isOnDashboard"
  ></posts-component>
</template>

<script>
import PostsComponent from "@/components/Posts.vue";
import { store } from "@/store";
import router from "@/router";
import TitleComponent from "@/components/Title";
import ButtonComponent from "@/components/Button";
import { auth } from "@/firebase";

export default {
  name: "DashboardView",
  components: { ButtonComponent, TitleComponent, PostsComponent },
  data() {
    return {
      posts: store.state.posts.filter(
        (post) => post.user === store.getters.getUser.uid
      ),
      username: store.getters.getUser.displayName,
      isOnDashboard: router.currentRoute.value.path === "/dashboard",
    };
  },
  methods: {
    async logout() {
      await auth.signOut();
    },
  },
};
</script>

<style scoped></style>
