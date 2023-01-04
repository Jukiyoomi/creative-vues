<template>
  <div>
    <v-img
      :src="url"
      aspect-ratio="1/1"
      width="45"
      height="45"
      class="rounded-circle"
      :cover="true"
      alt="Image of user"
    ></v-img>
  </div>
</template>

<script lang="ts">
export default {
  name: "AvatarComponent",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
