<template>
  <div class="selection-popup">
    <div
      class="selection-popup__title no-select"
      @click.prevent="showList = !showList"
    >
      {{ title }}
    </div>
    <Transition
      enter-active-class="animate__animated animate__faster  animate__bounceIn"
      leave-active-class="animate__animated animate__faster animate__bounceOut"
    >
      <div v-show="showList" class="selection-popup__list">
        <ul class="selection-popup__ul">
          <li
            v-for="(item, index) in listItem"
            :key="index"
            class="selection-popup__li"
            @click="selectAListItem(item.name)"
          >
            <slot name="item" v-bind="item" />
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SelectionPopup",
  props: {
    title: {
      type: String,
      require: true,
    },
    listItem: {
      type: Array,
      require: true,
    },
  },
  emits: ["getValue"],
  setup(props, { emit }) {
    const showList = ref(false);

    const selectAListItem = (element: string) => {
      showList.value = !showList.value;
      emit("getValue", element);
    };

    return { showList, selectAListItem };
  },
});
</script>

<style lang="scss" scoped>
.selection-popup {
  position: relative;

  &__title {
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }

  &__list {
    position: absolute;
    bottom: 120%;
    left: 0%;

    border: 2px solid #ccc;
    border-radius: 5px;

    color: #ccc;

    background: $white;

    &:hover {
      border: 2px solid $active-day;
    }
  }

  &__ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 5px;

    list-style: none;
  }

  &__li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    padding: 5px;

    transition: all 0.2s ease;

    &:hover {
      border-radius: 3px;
      color: $active-day;
      background: $white;
      cursor: pointer;
      transform: scale(1.4);
    }
  }
}
</style>