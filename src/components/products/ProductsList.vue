<template lang="pug">
FilterCategory(:selectedCategories="selectedCategories" @update:filter="applyFilter")
ul.products-list(v-if="!noFilteredProducts")
  li.products-item.product(v-for="(product, idx) in filteredProducts" :key="idx")
    img.product-img(:alt="product.title" :src="getCurrentImg(idx)" width='278px' height='278px')
    h3.product-title Краска {{ product.title }}
    p.product-price {{ Math.floor(product.price) }}0 ₽
div.products-no-found(v-else) Извините, товары по запросу не найдены. Пожалуйста, попробуйте изменить фильтры или обновить страницу
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import FilterCategory from "./filters/FilterCategory.vue";
import { IProduct } from "@/types/products";

export default defineComponent({
  name: "ProductsList",
  components: {
    FilterCategory,
  },
  setup() {
    const store = useStore();
    const products = computed<IProduct[]>(() => store.getters.getProducts);
    const filteredProducts = computed<IProduct[]>(
      () => store.getters.getFilteredProducts
    );
    const selectedCategories = ref<string[]>([]);
    const paints = ref([
      "paints/paint1.png",
      "paints/paint2.png",
      "paints/paint3.png",
      "paints/paint4.png",
      "paints/paint5.png",
      "paints/paint6.png",
      "paints/paint7.png",
      "paints/paint8.png",
      "paints/paint9.png",
    ]);

    const getCurrentImg = (idx: number) => {
      const imgIndex = idx % paints.value.length;
      return paints.value[imgIndex];
    };

    const applyFilter = (categories: string[]) => {
      selectedCategories.value = categories;
      store.dispatch("fetchFilteredProducts", categories);
    };

    onMounted(() => {
      if (!products.value.length) {
        store.dispatch("fetchProducts");
      }
    });

    watch(selectedCategories, newCategories => {
      store.dispatch("fetchFilteredProducts", newCategories);
    });

    const noFilteredProducts = computed(
      () => filteredProducts.value.length === 0
    );

    return {
      products,
      selectedCategories,
      filteredProducts,
      getCurrentImg,
      applyFilter,
      noFilteredProducts,
    };
  },
});
</script>

<style lang="scss" scoped>
.products-list {
  display: grid;
  column-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(284px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(378px, 1fr));
  grid-column: 2 / -1;
  grid-row: 2 / 3;
}

.products-no-found {
  grid-column: 2 / -1;
  grid-row: 2 / 3;
  font-size: $fz-24px;
}

.product-img {
  object-fit: cover;
}
</style>
