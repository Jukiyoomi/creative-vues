<template>
  <form
    @submit.prevent="createPost"
    class="w-100 position-absolute rounded-lg pa-8"
  >
    <title-component text="What's on your mind today ?"></title-component>
    <article>
      <p>Tell us !</p>
      <textarea v-model="value" class="w-100 pa-2 mt-2 mx-auto"></textarea>
      <p :class="value.length > maxLength ? 'invalid' : null">
        {{ value.length }}/{{ maxLength }}
      </p>
    </article>
    <button-component primary :disabled="value.length > maxLength"
      >Submit</button-component
    >
  </form>
</template>

<script lang="ts" setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import { store } from "@/store";
import { createDoc } from "@/firebase/queries";
import { toast } from "vue3-toastify";
import router from "@/router";
import TitleComponent from "@/components/TitleComponent.vue";
import { ref } from "vue";

const id = ref("post_create");
const value = ref("");
const maxLength = 300;
const toastOptions = ref({
  autoClose: true,
  closeButton: true,
  isLoading: false,
});

async function createPost() {
  if (value.value.length === 0) {
    toast.error("You have to write something");
    return;
  }
  const toastId = toast.loading("Please wait...", {
    toastId: id.value,
  });

  try {
    const newPost = await createDoc("posts", {
      text: value.value.trim(),
      user: store.state.user?.uid,
      avatar: store.state.user?.photoURL,
      username: store.state.user?.displayName,
    });

    if (newPost) {
      toast.update(toastId, {
        type: "success",
        render: "New Post Created",
        ...toastOptions.value,
      });
      value.value = "";
      await router.push({ name: "dashboard" });
    }
  } catch (e) {
    console.log(e);
    toast.update(id.value, {
      type: "error",
      render: "Error creating post",
      ...toastOptions.value,
    });
  }
}
</script>

<style scoped lang="scss">
form {
  max-width: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  margin-top: 5rem;
  box-shadow: -1px 8px 35px 6px rgba(214, 214, 214, 0.75);
  -webkit-box-shadow: -1px 8px 35px 6px rgba(214, 214, 214, 0.75);
  -moz-box-shadow: -1px 8px 35px 6px rgba(214, 214, 214, 0.75);
}
article {
  margin: 1rem 0;
}
h2 {
  margin-bottom: 1rem;
}
textarea {
  resize: vertical;
  background: #282d3c;
  color: #eee;
  min-height: 70px;
  border-radius: 0.4rem;
}
.invalid {
  color: red;
}
</style>
