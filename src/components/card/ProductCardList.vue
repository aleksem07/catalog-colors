<template lang="pug">
.card-products 
  p.card-products-count(v-if="AllProductsQuantity() === 0")
  p.card-products-count(v-else-if="AllProductsQuantity() < 5 ") {{ AllProductsQuantity() }} {{ AllProductsQuantity() === 1 ? 'товар' : 'товара' }}
  p.card-products-count(v-else) {{ AllProductsQuantity() }} товаров

  button(v-if="AllProductsQuantity() > 0").card-products-clear(@click="clearCard")  очистить список
  button(v-else).card-products-clear

  ul.card-products-list
    li(v-if="productsInCard.length > 0")(:class="product.inStock ? '' : 'product--out'").card-products-item.product(v-for="product in productsInCard")
      img.product-img(:alt="product.title" :src="product.image" width='96px' height='96px')
      .product-info
        h3.product-title Краска {{ product.title }}
        p.product-price {{ Math.floor(product.price) * 10 * product.quantity }}₽
      .product-quantity
        button(v-if="product.inStock").product-quantity--minus(@click="decrementProductQuantity(product)") -
        button(v-else)(disabled).product-quantity--minus(@click="decrementProductQuantity(product)") -

        p.product-quantity--count {{ product.quantity }}

        button(v-if="product.inStock").product-quantity--plus(@click="addToCart(product)") +

        button(v-else)(disabled).product-quantity--plus(@click="addToCart(product)") +
      button(v-if="product.inStock").product-del(@click="removeProduct(product)") x 
      button(v-else).product-del(@click="randomProduct(product)") random
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

    const decrementProductQuantity = (product: IProduct) => {
      const currentProductsInCard = store.getters.getProductsInCard;
      const productIndex = currentProductsInCard.findIndex(
        (productInCard: IProduct) => productInCard.id === product.id
      );

      if (productIndex !== -1) {
        currentProductsInCard[productIndex].quantity--;
      }

      if (currentProductsInCard[productIndex].quantity === 0) {
        removeProduct(product);
      } else {
        store.commit("setProductsInCard", currentProductsInCard);
      }
    };

    const randomProduct = (product: IProduct) => {
      const currentProductsInCard = store.getters.getFilteredProducts;
      let productIndex = Math.floor(
        Math.random() * currentProductsInCard.length
      );

      if (!currentProductsInCard[productIndex].inStock) {
        productIndex = Math.floor(Math.random() * currentProductsInCard.length);
      }

      addToCart(store, currentProductsInCard[productIndex]);

      removeProduct(product);
    };

    return {
      productsInCard,
      clearCard,
      removeProduct,
      addToCart: (product: IProduct) => addToCart(store, product),
      AllProductsQuantity: () => AllProductsQuantity(productsInCard.value),
      decrementProductQuantity,
      randomProduct,
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

.product--out {
  opacity: 0.5;
}

.product-quantity {
  display: flex;
}
</style>
