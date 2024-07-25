<template lang="pug">
p.sort sort filter1
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilterSort",
});
</script>

<style lang="scss" scoped>
.sort {
  width: 50%;
  text-align: end;
  grid-column: -1 / -2;
  grid-row: 1 / 2;
}
</style>
