<template lang="pug">
section.promo 
  img.promo-slide(alt="Слайд 1" src="slider.jpg")
  
  .promo-container 
    p.breadcrumbs Главная Продукты Краски 
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SliderPromo",
});
</script>

<style lang="scss" scoped>
.promo {
  display: grid;
  color: $color-light;
}

.promo-container,
.promo-slide {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.promo-slide {
  z-index: -1;
  max-height: 560px;
  width: 100%;
  object-fit: contain;
}

.promo-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.breadcrumbs {
  margin-top: 32px;
  grid-column: 1 / 2;
  font-size: $fz-10px;
  line-height: 100%;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.3;
}
</style>
