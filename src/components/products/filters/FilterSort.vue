<template lang="pug">
select.sort(
  name="sort"
  id="sort"
  v-model="selectedSort"
  @change="updateSort",
)
  option(
    v-for="option in options"
    :key="option.value"
    :value="option.value"
  ) {{ option.text }}

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

const options = [
  { value: "high", text: "Сначала дорогие" },
  { value: "low", text: "Сначала дешевые" },
  { value: "popular", text: "Сначала Популярные" },
  { value: "new", text: "Сначала Новые" },
];

export default defineComponent({
  name: "FilterSort",

  setup() {
    const store = useStore();
    const selectedSort = ref(options[0].value);
    const updateSort = () => {
      store.commit("setSelectedSort", selectedSort.value);
    };

    return {
      options,
      selectedSort,
      updateSort,
    };
  },
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
