<template lang="pug">
header.header
  .header-container
    .burger
    <LogoMain />
    <PagesList />
    <CallRequest />
    <IconsComponent />
    <CardIcon />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoMain from "../logo/LogoMain.vue";
import PagesList from "./PagesList.vue";
import CallRequest from "./CallRequest.vue";
import IconsComponent from "./UserIcons.vue";
import CardIcon from "./CardIcon.vue";

export default defineComponent({
  name: "AppHeader",
  components: {
    LogoMain,
    PagesList,
    CallRequest,
    IconsComponent,
    CardIcon,
  },
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding-block: 36px;

  @media (max-width: ($size_tablet - 1px)) {
    padding-bottom: 14px;
  }
}

.header-container {
  display: flex;
  align-items: center;
  column-gap: 6.5%;
  justify-content: space-between;

  @media (max-width: ($size_tablet - 1px)) {
    padding-bottom: 20px;
    border-bottom: 1px solid $color-dark--006;
  }
}

.burger {
  display: none;

  width: 24px;
  height: 2px;
  background-color: $color-dark;
  position: relative;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: $color-dark;
    left: 0;
  }

  &::before {
    top: -7px;
  }

  &::after {
    top: 7px;
  }

  @media (max-width: $size_desktop) {
    display: block;
  }
}
</style>
