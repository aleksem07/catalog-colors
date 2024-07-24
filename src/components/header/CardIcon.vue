<template lang="pug">
.card
  p.card_title 4
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardIcon",
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
