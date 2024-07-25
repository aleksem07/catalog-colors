import { createStore } from "vuex";
import axios from "axios";
import { IProduct } from "@/types/products";

type Category = "new" | "inStock" | "contract" | "exclusive" | "sale";

export default createStore({
  state: {
    products: [] as IProduct[],
    filteredProducts: [] as IProduct[],
  },
  getters: {
    getProducts: state => state.products,
    getFilteredProducts: state => state.filteredProducts,
  },
  mutations: {
    setProducts: (state, products) => {
      state.products = products;
      state.filteredProducts = products;
    },
    setFilteredProducts: (state, products) => {
      state.filteredProducts = products;
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
  },
  modules: {},
});
