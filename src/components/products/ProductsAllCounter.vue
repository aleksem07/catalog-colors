<template lang="pug">
p.counter(v-if="filteredProducts.length === 1") {{ filteredProducts.length }} товар
p.counter(v-else) {{ filteredProducts.length }} товаров
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { IProduct } from "@/types/products";

export default defineComponent({
  name: "ProductsAllCounter",
  setup() {
    const store = useStore();

    const filteredProducts = computed<IProduct[]>(
      () => store.getters.getFilteredProducts
    );

    return {
      filteredProducts,
    };
  },
});
</script>

<style lang="scss" scoped>
.counter {
  padding-bottom: 44px;
  width: 50%;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
</style>
