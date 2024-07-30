<template>
  <AppHeaderVue />
  <AppMainVue h1="Магазин Colors по продаже краски" />
  <AppFooterVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppFooterVue from "./components/AppFooter.vue";
import AppHeaderVue from "./components/header/AppHeader.vue";
import AppMainVue from "./components/AppMain.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeaderVue,
    AppMainVue,
    AppFooterVue,
  },
});
</script>

<style lang="scss">
#app {
  font-family: $font_family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text-main;
  font-size: $fz-16px;
  font-weight: 400;
  line-height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  min-width: $size_mobile;
  justify-content: flex-start;
  align-items: flex-start;
}

body {
  margin: 0;
  @include transition-default(background-color 0.3s);

  &:has(.bcg-modal--open),
  &:has(.modal-content--open) {
    overflow: hidden;
  }
}

ul,
ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  font-weight: normal;
  color: inherit;
}

p {
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  background-color: transparent;
}

[class*="-container"] {
  margin: 0 auto;
  max-width: calc($size_desktop - $padding_container * 2);
  padding-inline: $padding_container;

  @media (max-width: ($size_tablet - 1px)) {
    max-width: calc($size_mobile - $padding_container--mobile * 2);
    padding-inline: $padding_container--mobile;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
