<template lang="pug">
.filter-category
  label.filter-category--label(v-for="(category, key, idx) in categories" :key="idx") {{category}}
    input.filter-category--input(type="checkbox" :value="key" v-model="localSelectedCategories" @change="updateFilter")
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "FilterCategory",
  props: {
    selectedCategories: {
      type: Array as () => string[],
      required: true,
    },
  },
  emits: ["update:filter"],
  setup(props, { emit }) {
    const categories = ref({
      new: "Новинки",
      inStock: "В наличии",
      contract: "Контрактные",
      exclusive: "Эксклюзивные",
      sale: "Распродажа",
    });

    const localSelectedCategories = ref(props.selectedCategories);

    watch(
      () => props.selectedCategories,
      newCategories => {
        localSelectedCategories.value = newCategories;
      },
      { immediate: true }
    );

    const updateFilter = () => {
      emit("update:filter", localSelectedCategories.value);
    };

    return {
      categories,
      localSelectedCategories,
      updateFilter,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-category {
  width: calc($size_desktop / 6);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  grid-column: 1 / 2;
  grid-row: 1 / -1;
}

.filter-category--label {
  padding-left: 53px;
  font-size: $fz-12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  text-wrap: nowrap;
}

.filter-category--input {
  width: 0;
  &:checked::before,
  &:not(:checked)::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 22px;
    border-radius: 40px;
    @include transition-default(background-color);
    opacity: 1;
  }

  &:checked::before {
    background-color: $color-brand;
  }

  &:not(:checked)::before {
    background-color: $color-gray;
  }

  &:checked::after,
  &:not(:checked)::after {
    z-index: 10;
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $color-dark;
    @include transition-default(left, 0.5s);
    opacity: 1;
  }

  &:checked::after {
    left: 21px;
  }

  &:not(:checked)::after {
    left: 7px;
  }
}
label:has(input:focus-visible) {
  outline: 2px solid $color-brand;
  border-radius: 10px;
}
</style>
