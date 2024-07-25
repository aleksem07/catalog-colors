<template lang="pug">
.filter-category
  label.filter-category--label(v-for="(name, idx) in categoriesName") {{name}}
    input.filter-category--input(type="checkbox")
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FilterCategory",
  setup() {
    const categoriesName = ref([
      "Новинки",
      "Есть в наличии",
      "Контрактные",
      "Эксклюзивные",
      "Распродажа",
    ]);

    return {
      categoriesName,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-category {
  width: calc(100% / 6);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.filter-category--label {
  padding-left: 53px;
  font-size: $fz-12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
}

.filter-category--input {
  visibility: hidden;

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
    visibility: visible;
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
    visibility: visible;
  }

  &:checked::after {
    left: 21px;
  }

  &:not(:checked)::after {
    left: 7px;
  }
}
</style>
