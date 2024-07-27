import { IProduct } from "@/types/products";
import { Store } from "vuex";
import { IState } from "@/types/products";

const addToCart = (store: Store<IState>, product: IProduct) => {
  const currentProductsInCard = store.getters.getProductsInCard;
  const productIndex = currentProductsInCard.findIndex(
    (productInCard: IProduct) => productInCard.id === product.id
  );
  if (productIndex !== -1) {
    currentProductsInCard[productIndex].quantity++;
  } else {
    currentProductsInCard.push({ ...product, quantity: 1 });
  }
  store.commit("setProductsInCard", currentProductsInCard);
};

const AllProductsQuantity = (products: IProduct[]) => {
  let quantity = 0;
  products.forEach((product: IProduct) => {
    if (product.quantity) quantity += product.quantity;
  });
  return quantity;
};

export { addToCart, AllProductsQuantity };
