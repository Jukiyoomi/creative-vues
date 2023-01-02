<template>
  <h1 class="title">{{ text }}</h1>
</template>

<script>
export default {
  name: "TitleComponent",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  text-transform: capitalize;
}
</style>
