<template>
  <AppHeaderVue />
  <AppMainVue h1="Магазин Colors по продаже краски" />
  <AppFooterVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppFooterVue from "./components/AppFooter.vue";
import AppHeaderVue from "./components/AppHeader.vue";
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: start;
  align-items: start;
}

body {
  margin: 0;
}
</style>
