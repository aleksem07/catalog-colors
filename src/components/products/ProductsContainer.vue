<template lang="pug">
section.products
  .products-container
    <ProductsAllCounterVue />
    <FilterSortVue />
    <ProductsListVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterSortVue from "./filters/FilterSort.vue";
import ProductsAllCounterVue from "./ProductsAllCounter.vue";
import ProductsListVue from "./ProductsList.vue";

export default defineComponent({
  name: "ProductsContainer",
  components: {
    ProductsAllCounterVue,
    FilterSortVue,
    ProductsListVue,
  },
});
</script>

<style lang="scss" scoped>
.products-container {
  padding-top: 48px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, auto);
}
</style>
