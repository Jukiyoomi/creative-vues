<template>
  <section>
    <title-component text="Join Today"></title-component>
    <div>
      <p>Sign in with one of the providers</p>
      <button-component classes="grow" :on-click="this.auth">
        <v-icon large color="#018f01">mdi-google</v-icon>
        Sign in with Google</button-component
      >
    </div>
  </section>
</template>

<script>
import ButtonComponent from "@/components/Button.vue";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
import { store } from "@/store";
import router from "@/router";
import TitleComponent from "@/components/Title";
export default {
  name: "AuthView",
  components: { TitleComponent, ButtonComponent },
  methods: {
    async auth() {
      const googleProvider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, googleProvider);
        await store.dispatch("setUser", result.user);
        setTimeout(async () => await router.push({ name: "dashboard" }), 2000);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
section {
  width: 80%;
  border-radius: 1rem;
  margin: 5rem auto 0;
  padding: 2rem;
  box-shadow: -1px 8px 35px 6px rgba(214, 214, 214, 0.75);
  -webkit-box-shadow: -1px 8px 35px 6px rgba(214, 214, 214, 0.75);
  -moz-box-shadow: -1px 8px 35px 6px rgba(214, 214, 214, 0.75);

  h2 {
    margin-bottom: 1rem;
  }
}
.grow {
  width: 100%;
  margin-top: 1rem;
  gap: 0.5rem;
}
</style>
