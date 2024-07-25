<template lang="pug">
ul.products-list
  li.products-item.product(v-for="(product, idx) in products" :key="idx")
    img.product-img(:alt="product.title" :src="getRandomImg()" width='278px' height='278px')
    h3.product-title Краска {{ product.title }}
    p.product-price {{ Math.floor(product.price) }}0 ₽
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ProductsList",
  setup() {
    const products = ref([]);
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

    const fetchProducts = async () => {
      try {
        const resp = await axios.get(
          "https://66a1121d7053166bcabde449.mockapi.io/api/v1/products"
        );
        products.value = resp.data;
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const getRandomImg = () => {
      const randomIdx = Math.floor(Math.random() * paints.value.length);
      return paints.value[randomIdx];
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      getRandomImg,
    };
  },
});
</script>

<style lang="scss" scoped>
.products-list {
  display: grid;
  column-gap: 1.5rem;
  grid-template-columns: repeat(5, 1fr);
}

.product-img {
  object-fit: cover;
}
</style>
