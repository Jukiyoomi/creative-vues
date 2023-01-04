<template>
  <button :class="customClass" class="d-flex" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed } from "vue";
import { IButtonProps } from "@/interfaces";

export default {
  name: "ButtonComponent",
  props: {
    primary: Boolean,
    classes: String,
    onClick: Function,
    disabled: Boolean,
  },
  setup(props: IButtonProps) {
    const customClass = computed(() => [
      props.primary ? "primary" : "secondary",
      String(props.classes) ?? "",
      props.disabled ? "disabled" : null,
    ]);

    return {
      customClass,
    };
  },
};
</script>

<style scoped lang="scss">
button {
  border: 3px solid transparent;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  border-radius: 0.4rem;
  padding: 0.5rem 1.3rem;
  cursor: pointer;
  transition: filter 0.3s;
  &:hover {
    filter: brightness(0.9);
  }
}
.primary {
  background: #018f01;
  color: #fff;
}
.secondary {
  color: #018f01;
  background: #fff;
  border-color: #018f01;
}
.disabled {
  background: #4b4b4b;
  cursor: not-allowed;
}
</style>
