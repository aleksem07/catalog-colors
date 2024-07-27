<template lang="pug">
header.header
  .header-container
    <LogoMain />
    <PagesList />
    <CallRequest />
    <IconsComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoMain from "../logo/LogoMain.vue";
import PagesList from "./PagesList.vue";
import CallRequest from "./CallRequest.vue";
import IconsComponent from "./UserIcons.vue";

export default defineComponent({
  name: "AppHeader",
  components: {
    LogoMain,
    PagesList,
    CallRequest,
    IconsComponent,
  },
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding-block: 41px;
}

.header-container {
  display: flex;
  align-items: center;
  column-gap: 1%;
  justify-content: space-between;
}
</style>
