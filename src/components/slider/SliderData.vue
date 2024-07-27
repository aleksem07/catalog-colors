<template lang="pug">
section.slider
  button.slider-button(@click="prev" :disabled="currentIndex === 0") Previous
  .slide(v-for="(item, index) in items" :key="index" v-show="index === currentIndex") 
    .slider-title {{ item.title }}
    .slider-desc {{ item.desc }}
  button.slider-button(@click="next" :disabled="currentIndex === items.length - 1") Next
  ul.slider-navigate.slider-navigate-list
    li.slider-navigate-item(:class="{ active: index === currentIndex }")(v-for="(item, index) in items" :key="index")
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SliderData",
  props: {
    items: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props) {
    const currentIndex = ref(0);

    const prev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };

    const next = () => {
      if (currentIndex.value < props.items.length - 1) {
        currentIndex.value++;
      }
    };

    return {
      currentIndex,
      prev,
      next,
    };
  },
});
</script>

<style lang="scss" scoped>
.slider {
  grid-column: 2 / -2;
  grid-row: 2 / -1;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 0.5fr auto auto;
  width: 100%;
}

.slider-title {
  margin-bottom: 24px;
  font-size: $fz-72px;
  line-height: 88%;
  letter-spacing: -0.02em;
  color: $color-light;
}

.slider-desc {
  font-weight: 500;
  line-height: 130%;
  letter-spacing: 0.02em;
}

.slider-navigate {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  width: 100%;
}

.slider-navigate-list {
  margin: 0 auto;
  padding-inline: 24px;
  width: fit-content;
  max-height: 32px;
  background: $color-dark--040;
  display: flex;
  column-gap: 8px;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
}

.slider-navigate-item {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $color-light;
  opacity: 0.2;
}

.active {
  opacity: 1;
}
</style>
