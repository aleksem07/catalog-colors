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
        button(v-if="product.inStock").product-quantity--minus(@click="decrementProductQuantity(product)")
        button(v-else)(disabled).product-quantity--minus(@click="decrementProductQuantity(product)")

        p.product-quantity--count {{ product.quantity }}

        button(v-if="product.inStock").product-quantity--plus(@click="addToCart(product)")
        button(v-else)(disabled).product-quantity--plus(@click="addToCart(product)")

      button(v-if="product.inStock").product-del.inStock(@click="removeProduct(product)")
      button(v-else).product-del.shuffle(@click="randomProduct(product)")
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 1L21 5L17 9" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7 23L3 19L7 15" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
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
.card-products {
  display: grid;
  row-gap: 10px;
  align-content: start;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
}

.card-products-count {
  font-size: $fz-14px;
  line-height: 112%;
}

.card-products-clear {
  font-family: $font_family;
  width: max-content;
  justify-self: end;
  font-weight: 300;
  font-size: $fz-14px;
  line-height: 112%;
  text-align: right;
  opacity: 0.2;
  text-transform: uppercase;
}

.card-products-list {
  max-height: 70vh;
  overflow: auto;
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  display: grid;
  row-gap: 13px;
}

.product {
  padding-block: 6px;
  @include flex(flex-start, center);
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

button[class*="product-quantity"] {
  border-radius: 4px;
  width: 40px;
  height: 24px;
  background-color: $color-gray;
}

.product-quantity--minus {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 1px;
    background-color: $color-dark;
  }
}

.product-quantity--plus {
  position: relative;

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 1px;
    border-radius: 50%;
    background-color: $color-dark;
    border-radius: 8px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(90deg);
  }
}

.product-info {
  padding-inline: 6px;
  max-width: 35%;
  @include flex(flex-start, flex-start);
  flex-direction: column;
  row-gap: 19px;
}

.product-title {
  padding-top: 19px;
  font-weight: 300;
  line-height: 112%;
  letter-spacing: 0.02em;
}

.product--out {
  opacity: 0.5;
}

.product-quantity {
  padding-top: 15px;
  @include flex(center, center);
  column-gap: 20px;
  margin-inline: auto;
}

.inStock {
  margin-top: 14px;
  margin-right: 6px;
  font-size: $fz-20px;
  position: relative;
  padding: 10px;

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 16px;
    height: 1px;
    border-radius: 50%;
    background-color: $color-dark;
    border-radius: 8px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.shuffle {
  padding-top: 20px;
  position: relative;
}
</style>
