<template>
  <component :is="tag">
    <slot>{{ content }}</slot>
  </component>
</template>

<script lang="ts">
export default {
  name: "AtomTitle",
  props: {
    tag: {
      type: String,
      required: true,
      validator(value: string) {
        return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value);
      },
    },
    content: {
      type: String,
      default: ''
    }
  }
};
</script>