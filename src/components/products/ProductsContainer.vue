<template lang="pug">
section.products
  .products-container
    <FilterCategoryVue />
    .products-view
      <ProductsAllCounterVue />
      <FilterSortVue />
      <ProductsListVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterCategoryVue from "./filters/FilterCategory.vue";
import FilterSortVue from "./filters/FilterSort.vue";
import ProductsAllCounterVue from "./ProductsAllCounter.vue";
import ProductsListVue from "./ProductsList.vue";

export default defineComponent({
  name: "ProductsContainer",
  components: {
    FilterCategoryVue,
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
  display: flex;
}

.products-view {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
</style>
