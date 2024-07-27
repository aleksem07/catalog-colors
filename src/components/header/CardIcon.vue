<template lang="pug">
button.card(@click="openCard") {{ productsInCard.length }}
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "CardIcon",

  setup() {
    const store = useStore();
    const productsInCard = computed(() => store.getters.getProductsInCard);

    const openCard = () => {
      store.commit("setIsCardOpen", true);
    };

    return {
      openCard,
      productsInCard,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: $color-brand;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-title {
  font-size: $fz-12px;
  font-weight: 500;
  letter-spacing: 0.06em;
}
</style>
