<template lang="pug">
main.main
  h1.visually-hidden {{ h1 }}
  ul.ul 
    
  <SliderPromoVue />
  <GoodsContainerVue />
  <CardModalVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GoodsContainerVue from "./goods/GoodsContainer.vue";
import SliderPromoVue from "./slider/SliderPromo.vue";
import CardModalVue from "./card/CardModal.vue";

export default defineComponent({
  name: "AppMain",
  props: {
    h1: String,
  },
  components: {
    SliderPromoVue,
    GoodsContainerVue,
    CardModalVue,
  },
});
</script>

<style scoped lang="scss"></style>
