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

<script lang="ts" setup>
import PostsComponent from "@/components/PostsComponent.vue";
import { store } from "@/store";
import router from "@/router";
import TitleComponent from "@/components/TitleComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { auth } from "@/firebase";
import { computed } from "vue";

const posts = computed(() =>
  store.state.posts.filter((post) => post.user === store.state.user?.uid)
);
const username = computed(() => store.state.user?.displayName);
const isOnDashboard = computed(
  () => router.currentRoute.value.path === "/dashboard"
);
async function logout() {
  await auth.signOut();
}
</script>

<style scoped></style>
