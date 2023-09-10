<template>
  <div class="animate__animated">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AtomAnimatedWrapper"
})
</script>