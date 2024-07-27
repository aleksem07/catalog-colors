<template lang="pug">
.card(:class="isCardOpen ? 'card--open' : 'card--close'")
  .card-header
    h2.card-title Корзина
    button.card_button--close(@click="closeCard") X 
  .card-products 
    p.card-products-count(v-if="productsInCard.length === 0")
    p.card-products-count(v-else-if="productsInCard.length < 5 ") {{ productsInCard.length}} {{ productsInCard.length === 1 ? 'товар' : 'товара' }}
    p.card-products-count(v-else) {{ productsInCard.length}} товаров
    button.card-products-clear(@click="clearCard")  очистить список
    <ProductCardList />
  .product-total
    p.product-total-title Итого
    p.product-total-price 0₽
    button.product-total-button Оформить заказ

</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import ProductCardList from "./ProductCardList.vue";

export default defineComponent({
  name: "CardModal",
  components: {
    ProductCardList,
  },
  setup() {
    const store = useStore();
    const isCardOpen = computed(() => store.state.isCardOpen);
    const productsInCard = computed(() => store.getters.getProductsInCard);

    const closeCard = () => {
      store.commit("setIsCardOpen", false);
    };

    const clearCard = () => {
      store.commit("setProductsInCard", []);
    };

    return {
      closeCard,
      isCardOpen,
      productsInCard,
      clearCard,
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

.card-title {
  font-weight: 500;
  font-size: $fz-30px;
  line-height: 88%;
  letter-spacing: -0.04em;
}

.card-header {
  @include flex-between;
}
</style>
