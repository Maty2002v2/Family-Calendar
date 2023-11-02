<script setup lang="ts">
import { computed } from 'vue';
import { useLocalStorage } from "@/composables/useLocalStorage";

const props = defineProps<{
  searchPhrase: string,
  showList: boolean
}>();

const emit = defineEmits(['selectOption']);

const localStorageIdsOfCreatedCalendars = useLocalStorage('idsOfCreatedCalendars', '[]');

const listOfCodes = computed(() => JSON.parse(localStorageIdsOfCreatedCalendars.value));
const filtredCodes = computed(() => listOfCodes.value.filter((code: string) => code.includes(props.searchPhrase)));

</script>

<template>
  <div v-if="props.showList" class="molecule-list-of-options-to-input custom-scrollbar">
    <div v-if="filtredCodes.length < 1" class="molecule-list-of-options-to-input__option">Brak</div>
    <div 
      v-for="(code, index) in filtredCodes" 
      :key="index" class="molecule-list-of-options-to-input__option"
      @click="$emit('selectOption', code)"
    >{{ code }}</div>
  </div>
</template>

<style lang="scss">
.molecule-list-of-options-to-input {
  display: flex;
  flex-direction: column;
  max-height: 150px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 3px;
  overflow-y: scroll;

  background: #FFFFFF;

  color: $background-color;

  &__option {
    padding: 10px 5px;
    &:hover {
      color: #FFFFFF;
      background: $main-color;
      cursor: pointer;
    }
  }
}
</style>