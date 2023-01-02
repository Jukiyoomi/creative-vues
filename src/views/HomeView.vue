<template>
  <title-component text="Check the latest thoughts !"></title-component>
  <posts-component :posts="posts"></posts-component>
</template>

<script>
import { defineComponent } from "vue";
import PostsComponent from "@/components/Posts.vue";
import { getDocs } from "@/firebase/queries";
import { store } from "@/store";
import TitleComponent from "@/components/Title";

// Components
export default defineComponent({
  name: "HomeView",
  components: { TitleComponent, PostsComponent },
  data() {
    return {
      posts: null,
    };
  },
  created() {
    getDocs("posts", (data) => {
      this.posts = data;
      store.dispatch("getPosts", data);
    });
  },
});
</script>
