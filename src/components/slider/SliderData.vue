<template lang="pug">
section.slider
  button.slider-button.slider-button--prev(@click="prev" :disabled="currentIndex === 0")
  .slide(v-for="(item, index) in items" :key="index" v-show="index === currentIndex") 
    h2.slider-title {{ item.title }}
    p.slider-desc {{ item.desc }}
  button.slider-button.slider-button--next(@click="next" :disabled="currentIndex === items.length - 1")
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
  align-items: center;
  grid-template-columns: 12rem auto 12rem;
  grid-template-rows: 0.5fr auto auto;
  width: 100%;
}

.slider-title {
  font-size: $fz-72px;
  line-height: 88%;
  letter-spacing: -0.02em;
  color: $color-light;
  font-family: $font_family;
}

.slider-desc {
  margin: 0 auto;
  max-width: 60%;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: 0.02em;
  font-family: $font_family;
}

.slider-navigate-list {
  margin: 0 auto;
  padding-inline: 24px;
  padding-block: 13px;
  width: fit-content;
  background: $color-dark--040;
  display: flex;
  column-gap: 8px;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  grid-column: 2 / 3;
  grid-row: -1 / -2;
}

.slider-navigate-item {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $color-light;
  opacity: 0.2;
}

.slide {
  padding-top: 31px;
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  row-gap: 23px;
  align-self: flex-start;
}

.slider-button {
  grid-row: 1 / -1;
  position: relative;
  width: 100%;
  height: 100%;

  &--prev,
  &--next {
    &::after,
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 43%;
      left: 63%;
      width: 2px;
      height: 32px;
      transform: rotate(135deg);
      border-radius: 50%;
      background: $color-light;
    }

    &::before {
      top: 49%;
      transform: rotate(45deg);
    }
  }

  &--next,
  &--prev {
    position: relative;
  }

  &--prev {
    transform: scaleX(-1);
  }
}
.active {
  opacity: 1;
}
</style>
