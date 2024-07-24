<template lang="pug">
main.main
  h1.visually-hidden {{ h1 }}
    
  <SliderPromoVue />
  <ProductsContainer />
  <CardModalVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductsContainer from "./products/ProductsContainer.vue";
import SliderPromoVue from "./slider/SliderPromo.vue";
import CardModalVue from "./card/CardModal.vue";

export default defineComponent({
  name: "AppMain",
  props: {
    h1: String,
  },
  components: {
    SliderPromoVue,
    ProductsContainer,
    CardModalVue,
  },
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
}
</style>
