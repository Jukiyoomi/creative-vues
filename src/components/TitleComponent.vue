<template>
  <h1 class="title">{{ text }}</h1>
</template>

<script lang="ts">
export default {
  name: "TitleComponent",
  props: {
    text: String,
  },
};
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  text-transform: capitalize;
}
</style>
