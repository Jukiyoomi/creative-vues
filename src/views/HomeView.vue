<template>
  <title-component text="Check the latest thoughts !"></title-component>
  <posts-component :posts="posts"></posts-component>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PostsComponent from "@/components/PostsComponent.vue";
import { getDocs } from "@/firebase/queries";
import { store } from "@/store";
import TitleComponent from "@/components/TitleComponent.vue";

const posts = ref();

getDocs("posts", (data) => {
  posts.value = data;
  store.dispatch("getPosts", data);
});
</script>
