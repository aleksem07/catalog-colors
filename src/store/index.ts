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
    selectedSort: "high",
  },
  getters: {
    getProducts: state => state.products,
    getFilteredProducts: state => {
      const sortedProducts = [...state.filteredProducts];
      switch (state.selectedSort) {
        case "high":
          return sortedProducts.sort((a, b) => +b.price - +a.price);
        case "low":
          return sortedProducts.sort((a, b) => +a.price - +b.price);
        case "popular":
          return sortedProducts.sort((a, b) => {
            if (a.popular && !b.popular) return -1;
            if (!a.popular && b.popular) return 1;
            return 0;
          });
        case "new":
          return sortedProducts.sort((a, b) => {
            if (a.new && !b.new) return -1;
            if (!a.new && b.new) return 1;
            return 0;
          });
        default:
          return sortedProducts;
      }
    },
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
    setSelectedSort: (state, selectedSort: string) => {
      state.selectedSort = selectedSort;
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
