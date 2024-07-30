<template lang="pug">
FilterCategory(:selectedCategories="selectedCategories" @update:filter="applyFilter")
ul.products-list(v-if="!noFilteredProducts")
  li.products-item.product(v-for="(product, idx) in filteredProducts" :key="idx")
    .product-img-box
      img.product-img(:alt="product.title" :src="product.image" )
    h3.product-title Краска {{ product.title }} 
    p.product-price {{ Math.floor(product.price) * 10 }} ₽
    button.product-add-card(@click="addToCart(product)") +
div.products-no-found(v-else) Извините, товары по запросу не найдены. Пожалуйста, попробуйте изменить фильтры или обновить страницу
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import FilterCategory from "./filters/FilterCategory.vue";
import { IProduct } from "@/types/products";
import { addToCart } from "@/utils/ProductsToCard";
import PAINTS from "@/common/paints";

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

    const initializeProductImages = (products: IProduct[]) => {
      const updatedProducts = products.map((product, idx) => {
        const imgIndex = idx % PAINTS.length;
        return {
          ...product,
          image: PAINTS[imgIndex],
        };
      });
      store.commit("setProducts", updatedProducts);
    };

    const applyFilter = (categories: string[]) => {
      selectedCategories.value = categories;
      store.dispatch("fetchFilteredProducts", categories);
    };

    onMounted(() => {
      if (!products.value.length) {
        store.dispatch("fetchProducts").then(() => {
          initializeProductImages(store.getters.getProducts);
        });
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
      initializeProductImages,
      applyFilter,
      noFilteredProducts,
      addToCart: (product: IProduct) => addToCart(store, product),
    };
  },
});
</script>

<style lang="scss" scoped>
.products-list {
  padding-top: 44px;
  display: grid;
  height: fit-content;
  column-gap: 1.2%;
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

.product {
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 1fr;
  row-gap: 15px;

  &:hover > .product-add-card {
    opacity: 1;
  }
}

.product-img-box {
  width: 278px;
  height: 278px;
  display: flex;
  justify-content: center;
  align-self: center;
  grid-row: 1 / 2;
}

.product-img {
  object-fit: scale-down;
  max-width: 100%;
  max-height: 100%;
}

.product-title {
  font-weight: 300;
  line-height: 112%;
  letter-spacing: 0.02em;
  grid-row: 2 / 3;
  min-height: 36px;
}

.product-add-card {
  padding-block: 7px;
  padding-inline: 37px;
  border-radius: 8px;
  background-color: $color-brand;
  max-width: fit-content;
  margin-left: auto;
  opacity: 0;
  @include transition-default;
}

.product-price,
.product-add-card {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
}
</style>
