<template>
  <v-card class="pa-5" elevation="3" v-memo="[post.text]">
    <!--Nom et Avatar-->
    <div class="d-flex w-100 align-center justify-space-between">
      <div class="d-flex align-center">
        <avatar-component :url="post.avatar"></avatar-component>
        <v-card-title>{{ post.username }}</v-card-title>
      </div>
      <div class="text-right">
        <v-card-subtitle>{{ createdAt }}</v-card-subtitle>
        <v-card-subtitle v-if="post.modified">Modified</v-card-subtitle>
      </div>
    </div>
    <!--Paragraphe du poste/Input de modification-->
    <v-card-text v-show="!onUpdateMode">{{ post.text }}</v-card-text>
    <textarea
      v-model="updateValue"
      v-show="onUpdateMode"
      autofocus
      class="w-100 pa-4"
    ></textarea>
    <!--Commentaires (à venir)/icones suppression-modification-->
    <div class="d-flex w-100 align-center justify-space-between mt-4">
      <v-card-subtitle>0 comments</v-card-subtitle>
      <div
        class="d-flex align-center icons"
        v-if="isOnDashboard"
        style="gap: 1rem"
      >
        <v-icon color="red" large @click="deletePost">mdi-delete</v-icon>
        <v-icon color="green" large @click="toggleUpdateMode"
          >mdi-pencil</v-icon
        >
      </div>
      <!--Likes-->
      <v-card-item v-else>
        <div class="d-flex align-center icons">
          <v-icon @click="toggleLiked" :color="liked ? 'red' : '#adadad'"
            >mdi-heart</v-icon
          >
          <p>{{ post.likes.length }}</p>
        </div>
      </v-card-item>
    </div>
  </v-card>
</template>

<script>
import AvatarComponent from "@/components/Avatar.vue";
import { formatDate } from "@/helpers/date";
import { deleteDocs, updateDocs } from "@/firebase/queries";
import { store } from "@/store";

export default {
  name: "PostComponent",
  components: { AvatarComponent },
  props: {
    post: {
      user: String,
      text: String,
      timestamp: {
        nanoseconds: Number,
        seconds: Number,
      },
      username: String,
      avatar: String,
      id: String,
      likes: Array,
    },
    isOnDashboard: Boolean,
  },
  data() {
    return {
      createdAt: "",
      onUpdateMode: false,
      updateValue: this.post.text,
      liked: this.post.likes.includes(store.state.user.uid),
    };
  },
  methods: {
    formatDate,
    async deletePost() {
      await deleteDocs("posts", this.post.id);
      await store.dispatch("deletePost", this.post.id);
    },
    toggleUpdateMode() {
      // Si on est en Update mode et si le texte du poste n'a pas changé, update
      if (this.onUpdateMode && this.updateValue !== this.post.text) {
        this.updatePost();
      }
      this.onUpdateMode = !this.onUpdateMode;
    },
    async updatePost() {
      await updateDocs("posts", this.post.id, {
        text: this.updateValue,
        modified: true,
      });
      await store.dispatch("updatePost", {
        id: this.post.id,
        text: this.updateValue,
      });
    },
    async toggleLiked() {
      if (!this.liked) {
        await updateDocs("posts", this.post.id, {
          likes: [...this.post.likes, store.state.user.uid],
        });
      } else {
        await updateDocs("posts", this.post.id, {
          likes: this.post.likes.filter(
            (like) => like !== store.state.user.uid
          ),
        });
      }
      this.liked = !this.liked;
    },
  },
  created() {
    this.createdAt = formatDate(this.post.timestamp.seconds);
  },
  updated() {
    console.log("Post updated");
    this.createdAt = formatDate(this.post.timestamp.seconds);
  },
};
</script>

<style scoped lang="scss">
.icons {
  gap: 1rem;
}
textarea {
  resize: vertical;
}
</style>
