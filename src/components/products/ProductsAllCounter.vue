<template lang="pug">
p.counter 412 товаров
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductsAllCounter",
});
</script>

<style lang="scss" scoped>
.counter {
  padding-bottom: 44px;
  width: 50%;
}
</style>
