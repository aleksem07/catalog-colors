<template lang="pug">
.bcg-modal(:class="isCardOpen ? 'bcg-modal--open' : ''")
.card(:class="isCardOpen ? 'card--open' : 'card--close'")
  .card-header
    h2.card-title Корзина
    button.card-button-close(@click="closeCard") X 
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

      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
.bcg-modal {
  @include transition-default(all 0.3s);
}
.bcg-modal--open {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: $color-dark;
  opacity: 0.7;
  @include transition-default(background-color 0.3s);
}

.card {
  padding: 40px;
  padding-top: 30px;
  margin: 0 auto;
  width: calc((100% / 3 - $padding_container * 2) + 8px);
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

    @media (max-width: ($size_tablet - 1px)) {
      right: -180%;
    }
  }

  @media (max-width: ($size_desktop - 1px)) {
    width: auto;
  }
}

.card-button-close {
  width: 48px;
  height: 48px;
  font-size: $fz-20px;
  position: relative;

  &::after {
    content: "";
    border-radius: 50%;
    border: 1px solid $color-dark;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 48px;
    height: 48px;
    opacity: 0.2;
    transform: translate(-50%, -50%);
    @include transition-default(opacity 0.2s);
  }

  &:hover::after {
    opacity: 1;
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
  @include flex;
  margin-bottom: 80px;
}

.product-total {
  padding-block: 115px;
  @include flex;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  column-gap: 40px;

  @media (max-width: ($size_desktop - 1px)) {
    display: flex;
    flex-direction: column;
    row-gap: 9px;
  }

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
