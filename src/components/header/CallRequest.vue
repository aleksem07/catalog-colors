<template lang="pug">
.call
  a.call-tel(href="tel:+74952217769") +7 (495) 221-77-69
  p.call-title Заказать звонок
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CallRequest",
});
</script>

<style lang="scss" scoped>
.call {
  display: flex;
  flex-direction: column;

  @media (max-width: $size_desktop) {
    display: none;
  }
}

.call-tel {
  font-weight: 500;
  letter-spacing: -0.02em;
  @include hover;
}

.call-title {
  font-size: $fz-14px;
  opacity: 0.3;
}
</style>
