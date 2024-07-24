<template lang="pug">
p goods vue
  <FilterCategoryVue />
  <FilterSortVue />
  <GoodsAllCounterVue />
  <GoodsListVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterCategoryVue from "./filters/FilterCategory.vue";
import FilterSortVue from "./filters/FilterSort.vue";
import GoodsAllCounterVue from "./GoodsAllCounter.vue";
import GoodsListVue from "./GoodsList.vue";

export default defineComponent({
  name: "GoodsContainer",
  components: {
    FilterCategoryVue,
    FilterSortVue,
    GoodsAllCounterVue,
    GoodsListVue,
  },
});
</script>
