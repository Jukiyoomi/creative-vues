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
          <v-icon
            @click="toggleLiked"
            :color="liked === true ? 'red' : '#adadad'"
            :class="!isLoggedIn ? 'unlikable' : null"
            >mdi-heart</v-icon
          >
          <p>{{ post.likes.length }}</p>
        </div>
      </v-card-item>
    </div>
  </v-card>
</template>

<script lang="ts">
import AvatarComponent from "@/components/AvatarComponent.vue";
import { deleteDocs, updateDocs } from "@/firebase/queries";
import { formatDate } from "@/helpers/date";
import { store } from "@/store";
import { computed, ref } from "vue";
import { IPostProps } from "@/interfaces";

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
  setup(props: IPostProps) {
    const createdAt = computed(() => formatDate(props.post.timestamp.seconds));
    const onUpdateMode = ref(false);
    const updateValue = ref(props.post.text);
    const liked = computed(() =>
      store.state.user?.uid
        ? props.post.likes.includes(store.state.user?.uid)
        : null
    );

    const isLoggedIn = computed(() => !!store.state.user);

    const deletePost = async () => {
      await deleteDocs("posts", props.post.id);
      await store.dispatch("deletePost", props.post.id);
    };
    const toggleUpdateMode = () => {
      // Si on est en Update mode et si le texte du poste n'a pas changé, update
      if (onUpdateMode.value && updateValue.value !== props.post.text) {
        updatePost();
      }
      onUpdateMode.value = !onUpdateMode.value;
    };

    const updatePost = async () => {
      await updateDocs("posts", props.post.id, {
        text: updateValue.value,
        modified: true,
      });
      await store.dispatch("updatePost", {
        id: props.post.id,
        text: updateValue.value,
      });
    };
    const toggleLiked = async () => {
      if (liked.value === false) {
        await updateDocs("posts", props.post.id, {
          likes: [...props.post.likes, store.state.user?.uid],
        });
      } else {
        await updateDocs("posts", props.post.id, {
          likes: props.post.likes.filter(
            (like: string) => like !== store.state.user?.uid
          ),
        });
      }
    };

    return {
      createdAt,
      onUpdateMode,
      updateValue,
      liked,
      isLoggedIn,
      deletePost,
      toggleUpdateMode,
      toggleLiked,
    };
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
.unlikable {
  pointer-events: none;
  user-select: none;
}
</style>
