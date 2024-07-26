<template lang="pug">
.card
  p card modal
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardModal",
});
</script>

<style lang="scss" scoped>
.card {
  position: fixed;
  outline: 5px solid rgba(247, 9, 9, 0.589);
  top: 0;
  right: 0;
  outline-offset: -5px;
}
</style>
