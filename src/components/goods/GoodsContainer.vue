<template lang="pug">
p goods vue
  <CategoryFilterVue />
  <SortFilterVue />
  <GoodsAllCounterVue />
  <GoodsListVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CategoryFilterVue from "./filters/CategoryFilter.vue";
import SortFilterVue from "./filters/SortFilter.vue";
import GoodsAllCounterVue from "./GoodsAllCounter.vue";
import GoodsListVue from "./GoodsList.vue";

export default defineComponent({
  name: "GoodsContainer",
  components: {
    CategoryFilterVue,
    SortFilterVue,
    GoodsAllCounterVue,
    GoodsListVue,
  },
});
</script>
