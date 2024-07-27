<template lang="pug">
.card-products 
  p.card-products-count(v-if="AllProductsQuantity() === 0")
  p.card-products-count(v-else-if="AllProductsQuantity() < 5 ") {{ AllProductsQuantity() }} {{ AllProductsQuantity() === 1 ? 'товар' : 'товара' }}
  p.card-products-count(v-else) {{ AllProductsQuantity() }} товаров

  button(v-if="AllProductsQuantity() > 0").card-products-clear(@click="clearCard")  очистить список
  button(v-else).card-products-clear

  ul.card-products-list
    li(v-if="productsInCard.length > 0").card-products-item.product(v-for="product in productsInCard")
      img.product-img(:alt="product.title" :src="product.image" width='96px' height='96px')
      .product-info
        h3.product-title Краска {{ product.title }}
        p.product-price {{ Math.floor(product.price) * 10 * product.quantity }} ₽
      .product-quantity
        button.product-quantity--minus -
        p.product-quantity--count {{ product.quantity }}
        button.product-quantity--plus(@click="addToCart(product)") +
      button.product-del(@click="removeProduct(product)") x 
    li(v-else) Корзина пуста
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { IProduct } from "@/types/products";
import { addToCart, AllProductsQuantity } from "@/utils/ProductsToCard";

export default defineComponent({
  name: "ProductCardList",
  setup() {
    const store = useStore();
    const productsInCard = computed(() => store.getters.getProductsInCard);

    const clearCard = () => {
      store.commit("setProductsInCard", []);
    };

    const removeProduct = (product: IProduct) => {
      const currentProductsInCard = store.getters.getProductsInCard;
      store.commit(
        "setProductsInCard",
        currentProductsInCard.filter(
          (productInCard: IProduct) => productInCard.id !== product.id
        )
      );
    };

    return {
      productsInCard,
      clearCard,
      removeProduct,
      addToCart: (product: IProduct) => addToCart(store, product),
      AllProductsQuantity: () => AllProductsQuantity(productsInCard.value),
    };
  },
});
</script>

<style lang="scss" scoped>
.card-products-list {
  max-height: 70vh;
  overflow: auto;
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
</style>
