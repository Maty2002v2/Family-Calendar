<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from '@/types/Components.interface'

defineProps<{
  title: string;
  listItem: Icon[];
}>();

const emit = defineEmits(["getValue"]);

const showList = ref(false);
const popup = ref();
const controller = new AbortController();

onMounted(() => {
  document.addEventListener(
    "click",
    (e) => {
      if (popup.value !== undefined && popup.value.contains(e.target) === false) {
        showList.value = false;
      }
    },
    { signal: controller.signal }
  );
});

onUnmounted(() => {
  controller.abort();
});

const selectAListItem = (element: string) => {
  showList.value = !showList.value;
  emit("getValue", element);
};
</script>

<template>
  <div class="molecule-selection-icon-popup" ref="popup">
    <div
      class="molecule-selection-icon-popup__title no-select"
      @click.prevent="showList = !showList"
    >
      {{ title }}
    </div>
    <Transition
      enter-active-class="animate__animated animate__faster animate__bounceIn"
      leave-active-class="animate__animated animate__faster animate__bounceOut"
    >
      <div v-show="showList" class="molecule-selection-icon-popup__list">
        <ul class="molecule-selection-icon-popup__ul">
          <li
            v-for="(item, index) in listItem"
            :key="index"
            class="molecule-selection-icon-popup__li"
            @click="selectAListItem(item.name)"
          >
            <slot name="item" v-bind="item" />
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.molecule-selection-icon-popup {
  position: relative;

  &__title {
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }

  &__list {
    @include position($bottom: 120%, $left: 0%);

    border: 2px solid #ccc;
    border-radius: 5px;

    color: #ccc;

    background: $white;

    &:hover {
      border: 2px solid $main-color;
    }
  }

  &__ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 5px;

    list-style: none;
  }

  &__li {
    @include flexbox;
    @include flex-centering;
    width: 20px;
    height: 20px;
    padding: 5px;

    transition: all 0.2s ease;

    &:hover {
      border-radius: 3px;
      color: $main-color;
      background: $white;
      cursor: pointer;
      transform: scale(1.4);
    }
  }
}
</style>
