<template>
  <div class="services">
    <Flicking 
      :options="{
        align: {camera: '20', panel: '0'}, 
        threshold: 0,
      }"
      @will-change="(event) => {currentIndex = event.index}"
    >
    </Flicking>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
    currentIndex: 0,
  }),
  components: {
    Flicking,
  }
})
</script>

<style scoped>

</style>