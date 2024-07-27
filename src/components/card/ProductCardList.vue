<template lang="pug">
ul.card-products-list
  li.card-products-item.product(v-for="product in productsInCard")
    img.product-img(:alt="product.title" :src="product.image" width='96px' height='96px')
    .product-info
      h3.product-title Краска {{ product.title }}
      p.product-price {{ Math.floor(product.price) }}0 ₽
    .product-quantity
      button.product-quantity--minus -
      p.product-quantity--count 1
      button.product-quantity--plus +
    button.product-del x 
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ProductCardList",
  setup() {
    const store = useStore();
    const productsInCard = computed(() => store.getters.getProductsInCard);

    return {
      productsInCard,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-products {
  flex: 1;
}

.product {
  @include flex-between;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid $color-dark;
    opacity: 0.1;
  }
}

.product-quantity {
  display: flex;
}

.product-total {
  padding-block: 80px;
  @include flex-between;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;

  &-price {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    font-weight: 500;
    font-size: $fz-30px;
    letter-spacing: -0.02em;
  }

  &-title {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    text-transform: capitalize;
  }

  &-button {
    padding-block: 20px;
    padding-inline: 58px;
    grid-column: 2 / 3;
    grid-row: 1 / -1;
    background-color: $color-brand;
    border-radius: 4px;
    font-weight: 500;
    font-size: $fz-12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}
</style>
