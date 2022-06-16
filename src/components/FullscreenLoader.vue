<template>
  <div class="loader">
    <img 
      class="loader__gif"
      :src="generalStore.getImageURL('dog-on-green-background.gif')"
    >
    <img 
      class="loader__company-logo"
      :src="generalStore.getImageURL('company-logo.svg')"
    >
  </div>
</template>
<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  })
})
</script>
<style scoped>
.loader {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 200;
  background: #125A44;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loader__gif {
  position: relative;
  margin-top: -40px;
}
.loader__company-logo {
  width: 224px;
  position: relative;
  margin-top: -40px;
}
</style>