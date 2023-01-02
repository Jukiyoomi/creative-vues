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

<script>
export default {
  name: "AvatarComponent",
  props: {
    url: String,
  },
  methods: {},
};
</script>

<style scoped></style>
