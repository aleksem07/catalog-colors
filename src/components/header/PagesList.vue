<template lang="pug">
ul.pages.pages-list 
  li.pages-item(v-for="(page, idx) in pages" :key="idx")
    a(href="#") {{ page }}
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PagesList",
  setup() {
    const pages = ref([
      "Продукты",
      "Цвета",
      "Вдохновение",
      "Советы",
      "Найти магазин",
    ]);

    return {
      pages,
    };
  },
});
</script>

<style lang="scss" scoped>
.pages-list {
  margin-right: auto;
  margin-left: 3%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
  cursor: pointer;

  font-size: $fz-14px;

  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.pages-item {
  text-transform: uppercase;
  @include hover;
}
</style>
