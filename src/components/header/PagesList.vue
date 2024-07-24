<template lang="pug">
ul.pages.pages-list 
  li.pages-item(v-for="(page, idx) in pages" :key="idx")
    a(href="/") {{ page }}
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
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
  cursor: pointer;
}

.pages-item {
  text-transform: uppercase;
}
</style>
