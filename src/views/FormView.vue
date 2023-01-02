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

<script>
import ButtonComponent from "@/components/Button.vue";
import { store } from "@/store";
import { createDoc } from "@/firebase/queries";
import { toast } from "vue3-toastify";
import router from "@/router";
import TitleComponent from "@/components/Title";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";

export default {
  name: "FormComponent",
  components: { TitleComponent, ButtonComponent },
  data() {
    return {
      isShowing: false,
      id: "post_create",
      value: "",
      maxLength: 300,
      toastOptions: {
        autoClose: true,
        closeButton: true,
        isLoading: false,
      },
    };
  },
  methods: {
    async createPost() {
      if (this.value.length === 0) {
        toast.error("You have to write something");
        return;
      }
      const id = toast.loading("Please wait...", {
        toastId: this.id,
      });

      try {
        const newPost = await createDoc("posts", {
          text: this.value.trim(),
          user: doc(db, "users/" + store.state.user.uid),
          avatar: store?.state?.user?.photoURL,
          username: store?.state?.user?.displayName,
        });

        if (newPost) {
          toast.update(id, {
            type: "success",
            render: "New Post Created",
            ...this.toastOptions,
          });
          this.value = "";
          await router.push({ name: "dashboard" });
        }
      } catch (e) {
        console.log(e);
        toast.update(id, {
          type: "error",
          render: "Error creating post",
          ...this.toastOptions,
        });
      }
    },
  },
};
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
