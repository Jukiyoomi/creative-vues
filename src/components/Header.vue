<template>
  <header>
    <router-link to="/">
      <h1 id="logo">Creative Vues</h1>
    </router-link>

    <div v-if="user">
      <router-link to="/new">
        <button-component primary>Post</button-component>
      </router-link>
      <router-link to="/dashboard">
        <avatar-component :url="user.photoURL"></avatar-component>
      </router-link>
    </div>
    <router-link to="/auth" v-else>
      <button-component primary>Join Now</button-component>
    </router-link>
  </header>
</template>

<script>
import ButtonComponent from "@/components/Button.vue";
import { store } from "@/store";
import AvatarComponent from "@/components/Avatar.vue";
export default {
  name: "HeaderComponent",
  components: { AvatarComponent, ButtonComponent },
  data() {
    return {
      user: null,
      isLoggedIn: false,
    };
  },
  updated() {
    this.isLoggedIn = !!store.state.user;
    this.user = store.state.user;
  },
  watch: {
    "$store.state.user": {
      handler() {
        this.isLoggedIn = !!store.state.user;
        this.user = store.state.user;
      },
    },
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .v-img__img {
    background-size: 100% 100%;
    display: none;
  }
}
.rounded {
  border-radius: 999px;
}
</style>
