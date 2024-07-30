<template lang="pug">
button.filter-category-button(@click='isOpen = true') Фильтры
div(:class="isOpen ? 'filter-category-overlay' : ''")(@click='isOpen = false')
.filter-category(:class="isOpen ? 'filter-category--open' : ''")
  label.filter-category-label(v-for="(category, key, idx) in categories" :key="idx") {{category}}
    input.filter-category-input(type="checkbox" :value="key" v-model="localSelectedCategories" @change="updateFilter")
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
      inStock: "Есть в наличии",
      contract: "Контрактные",
      exclusive: "Эксклюзивные",
      sale: "Распродажа",
    });

    const localSelectedCategories = ref(props.selectedCategories);
    const isOpen = ref(false);

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
      isOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-category-button {
  display: none;

  @media (max-width: ($size_tablet - 1px)) {
    display: block;
    font-weight: 500;
    font-size: $fz-12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: left;
  }
}

.filter-category {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  grid-column: 1 / 2;
  grid-row: 1 / -1;

  @media (max-width: ($size_tablet - 1px)) {
    display: none;
  }
}

.filter-category--open {
  display: none;
  @media (max-width: ($size_tablet - 1px)) {
    padding-top: 54px;
    background-color: #fff;
    width: 100%;
    height: calc(100% / 2);
    z-index: 1;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 24px 24px 0 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 50%;
    width: 28px;
    height: 4px;
    border-radius: 40px;
    background-color: $color-text-main;
    opacity: 0.6;
    transform: translateX(-50%);
  }
}

.filter-category-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $color-dark--070;
  z-index: 1;
}

.filter-category-label {
  padding-left: 48px;
  font-size: $fz-12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  text-wrap: nowrap;

  @media (max-width: ($size_tablet - 1px)) {
    margin-left: 24px;
  }
}

.filter-category-input {
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
