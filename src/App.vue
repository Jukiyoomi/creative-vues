<template>
  <v-app>
    <v-main>
      <header-component></header-component>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/Header.vue";
import "vue3-toastify/dist/index.css";

export default defineComponent({
  name: "App",
  components: { HeaderComponent },
  data() {
    return {
      //
    };
  },
});
</script>

<style lang="scss">
.v-application__wrap {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #565656;
}
a {
  text-decoration: none;
  color: inherit;
}
.color-toast {
  background: #282d3c;
}
i.v-icon.v-icon {
  color: #282d3c;
  cursor: pointer;
}
#id {
  font-size: 2rem;
}
</style>
