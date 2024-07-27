<template lang="pug">
.card(:class="isCardOpen ? 'card--open' : 'card--close'")
  .card-header
    h2.card-title Корзина
    button.card_button--close(@click="closeCard") X 
  <ProductCardList />
  .product-total
    p.product-total-title Итого
    p.product-total-price {{ priceTotal() }} ₽
    button.product-total-button Оформить заказ

</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import ProductCardList from "./ProductCardList.vue";
import { IProduct } from "@/types/products";

export default defineComponent({
  name: "CardModal",
  components: {
    ProductCardList,
  },
  setup() {
    const store = useStore();
    const isCardOpen = computed(() => store.state.isCardOpen);
    const productsInCard = computed(() => store.getters.getProductsInCard);

    const priceTotal = () => {
      let total = 0;
      productsInCard.value.forEach((product: IProduct) => {
        if (!product.inStock) return;
        total += (parseInt(product.price) * 10 || 0) * (product.quantity || 0);
      });
      return total;
    };

    const closeCard = () => {
      store.commit("setIsCardOpen", false);
    };

    return {
      closeCard,
      isCardOpen,
      productsInCard,
      priceTotal,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  padding: 40px;
  margin: 0 auto;
  width: calc(100% / 3 - $padding_container);
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background-color: $color-light;
  display: flex;
  flex-direction: column;

  &--open,
  &--close {
    @include transition-default(right 0.5s);
  }

  &--open {
    right: 0;
  }

  &--close {
    right: -100%;
  }
}

.card-products {
  flex: 1;
}

.card-title {
  font-weight: 500;
  font-size: $fz-30px;
  line-height: 88%;
  letter-spacing: -0.04em;
}

.card-header {
  @include flex-between;
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
    @include hover($color-light);
  }
}
</style>
