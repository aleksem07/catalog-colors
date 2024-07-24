<template lang="pug">
ul.products-list
  li.products-item.product(v-for="(product, idx) in products" :key="idx")
    img.product-img(alt="Товар 1" src="slider.jpg" width='278px' height='278px')
    h3.product-title Краска Wallquest, Brownsone MS90102 {{ product }}
    p.product-price 6000 rur
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProductsList",
  setup() {
    const products = ref(["1", "2", "3", "4", "5", "6"]);
    return {
      products,
    };
  },
});
</script>

<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.product-img {
  object-fit: cover;
}
</style>
