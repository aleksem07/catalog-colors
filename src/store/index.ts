import { createStore } from "vuex";
import axios from "axios";
import { IProduct } from "@/types/products";

type Category = "new" | "inStock" | "contract" | "exclusive" | "sale";

export default createStore({
  state: {
    products: [] as IProduct[],
    filteredProducts: [] as IProduct[],
    productsInCard: [] as IProduct[],
    isCardOpen: true,
  },
  getters: {
    getProducts: state => state.products,
    getFilteredProducts: state => state.filteredProducts,
    getProductsInCard: state => state.productsInCard,
    getIsCardOpen: state => state.isCardOpen,
  },
  mutations: {
    setProducts: (state, products: IProduct[]) => {
      state.products = products;
      state.filteredProducts = products;
    },
    setFilteredProducts: (state, products: IProduct[]) => {
      state.filteredProducts = products;
    },
    setProductsInCard: (state, products: IProduct[]) => {
      state.productsInCard = products;
    },
    setIsCardOpen: (state, isCardOpen: boolean) => {
      state.isCardOpen = isCardOpen;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const resp = await axios.get(
          "https://66a1121d7053166bcabde449.mockapi.io/api/v1/products"
        );
        commit("setProducts", resp.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    },
    fetchFilteredProducts({ commit, state }, selectedCategories: Category[]) {
      const filtered =
        selectedCategories.length === 0
          ? state.products
          : state.products.filter(product =>
              selectedCategories.every(category => {
                return product[category];
              })
            );

      commit("setFilteredProducts", filtered);
    },
    fetchProductsInCard({ commit, state }) {
      commit("setProductsInCard", state.products);
    },
    toggleIsCardOpen({ commit, state }) {
      commit("setIsCardOpen", !state.isCardOpen);
    },
  },
  modules: {},
});
