<template>
  <div>
    <atom-input-label :inputId="textareaId" :label="label" :requaied="requaied" />
    <atom-textarea
      :modelValue="modelValue"
      :textareaId="textareaId"
      :maxLength="maxLength"
      :placeholder="placeholder"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script lang="ts">
import { getCurrentInstance, computed } from "vue";

import AtomInputLabel from "@/components/atoms/AtomInputLabel.vue";
import AtomTextarea from "@/components/atoms/AtomTextarea.vue";

export default {
  name: "MoleculeTextareaWithText",
  components: {
    AtomInputLabel,
    AtomTextarea,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    maxLength: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 10,
    },
    requaied: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { uid } = getCurrentInstance();

    const textareaId = computed(() => `molecule-input-with-label-${uid}`);

    return {
      textareaId,
    };
  },
};
</script>
<style lang="scss"></style>
